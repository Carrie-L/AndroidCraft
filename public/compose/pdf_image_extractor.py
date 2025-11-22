import fitz  # PyMuPDF
import sys
import os
import re
import shutil
import tinify

# Set your TinyPNG API key. It's recommended to use an environment variable.
# You can get a free API key from https://tinypng.com/developers
TINYPNG_API_KEY = os.environ.get("TINYPNG_API_KEY")
if not TINYPNG_API_KEY:
    print("Error: TINYPNG_API_KEY environment variable not set.")
    print("Please get a key from https://tinypng.com/developers and set the environment variable.")
    sys.exit(1)

tinify.key = TINYPNG_API_KEY

def extract_and_compress_images(pdf_path, output_folder):
    """
    Extracts images from a PDF, compresses them using TinyPNG, and saves them.
    """
    doc = fitz.open(pdf_path)
    image_paths = []
    print(f"Processing '{pdf_path}'...")

    for page_index in range(len(doc)):
        page = doc.load_page(page_index)
        image_list = page.get_images(full=True)

        if image_list:
            print(f"Found {len(image_list)} images on page {page_index + 1}")
            for image_index, img in enumerate(image_list, start=1):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                
                image_filename = f"page{page_index + 1}_img{image_index}.{image_ext}"
                image_path = os.path.join(output_folder, image_filename)
                
                try:
                    # Compress image using tinify
                    source = tinify.from_buffer(image_bytes)
                    source.to_file(image_path)
                    image_paths.append(image_filename)
                    print(f"  - Saved and compressed: {image_filename}")
                except tinify.Error as e:
                    # If compression fails, save the original image
                    print(f"  - Tinify error for {image_filename}: {e}. Saving original image.")
                    with open(image_path, "wb") as img_file:
                        img_file.write(image_bytes)
                    image_paths.append(image_filename)

    doc.close()
    return image_paths

def create_markdown_file(folder_path, image_filenames):
    """
    Creates a markdown file listing all the extracted images.
    """
    folder_name = os.path.basename(folder_path)
    md_filename = f"{folder_name}.md"
    md_path = os.path.join(folder_path, md_filename)

    with open(md_path, "w") as md_file:
        for image_name in image_filenames:
            md_file.write(f"![[{image_name}]]\n")
    print(f"Created markdown file: {md_path}")


def process_pdf(pdf_path):
    """
    Processes a single PDF file: creates folder, moves file, extracts images, creates markdown.
    """
    try:
        # 0. Record original directory of the PDF
        original_dir = os.path.dirname(os.path.abspath(pdf_path)) or "."

        # 1. Create folder based on PDF name prefix
        pdf_basename = os.path.basename(pdf_path)
        match = re.match(r"^([\d\.]+)", pdf_basename)
        if not match:
            print(f"Skipping '{pdf_basename}': Name does not start with a number sequence (e.g., 1.1.2).")
            return

        folder_name = match.group(1)
        folder_path = os.path.join(original_dir, folder_name)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
        
        # 2. Move the PDF into the new folder
        new_pdf_path = os.path.join(folder_path, pdf_basename)
        shutil.move(pdf_path, new_pdf_path)
        print(f"Moved '{pdf_basename}' to '{folder_path}/'")

        # 3. Extract and compress images
        image_filenames = extract_and_compress_images(new_pdf_path, folder_path)

        if not image_filenames:
            print(f"No images found in '{pdf_basename}'.")
            return

        # 4. Create markdown file
        create_markdown_file(folder_path, image_filenames)

        # 5. Move the processed PDF out of the folder, back to its original directory
        final_pdf_path = os.path.join(original_dir, pdf_basename)
        if os.path.abspath(new_pdf_path) != os.path.abspath(final_pdf_path):
            if os.path.exists(final_pdf_path):
                print(f"PDF with same name already exists at destination '{final_pdf_path}'. Skipping moving the PDF out of the folder.")
            else:
                shutil.move(new_pdf_path, final_pdf_path)
                print(f"Moved '{pdf_basename}' out of '{folder_path}/' back to '{final_pdf_path}'.")

        print(f"Successfully processed '{pdf_basename}'.")

    except Exception as e:
        print(f"An error occurred while processing '{pdf_path}': {e}")


def main():
    """
    Main function to handle command-line arguments.
    """
    if len(sys.argv) < 2:
        print("Usage: python pdf_image_extractor.py <path_to_pdf_1.pdf> [<path_to_pdf_2.pdf> ...]")
        return

    for pdf_file in sys.argv[1:]:
        if pdf_file.lower().endswith('.pdf'):
            process_pdf(pdf_file)
        else:
            print(f"Skipping non-PDF file: {pdf_file}")

if __name__ == "__main__":
    main()