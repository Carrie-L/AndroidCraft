
import { Module, Difficulty, TopicCategory } from './types';

export const TOPIC_CATEGORIES: TopicCategory[] = [
  {
    id: 'compose',
    title: 'Jetpack Compose',
    description: 'Android 现代原生 UI 工具包。告别 View 系统，拥抱声明式 UI。',
    iconName: 'Layout',
    color: 'bg-android',
    isComingSoon: false
  },
  {
    id: 'kotlin',
    title: 'Network & API',
    description: '任何 App 的血液。没有网络，App 只是一个孤岛。精通 Retrofit 与 OkHttp。',
    iconName: 'Code',
    color: 'bg-purple-500',
    isComingSoon: true
  },
  {
    id: 'architecture',
    title: '架构设计',
    description: '学习 Clean Architecture，MVVM 模式以及依赖注入 (Hilt)。',
    iconName: 'Layers',
    color: 'bg-orange-500',
    isComingSoon: true
  },
  {
    id: 'performance',
    title: '性能优化',
    description: '深入内存管理与渲染机制。掌握 Profiler 调优技巧，消除卡顿，打造极致丝滑体验。',
    iconName: 'Cat',
    color: 'bg-pink-500',
    isComingSoon: true
  },
  {
    id: 'data-structure',
    title: '数据结构',
    description: '夯实计算机科学基础。从数组到图论，通过算法训练培养解决复杂问题的能力。',
    iconName: 'List',
    color: 'bg-green-500',
    isComingSoon: true
  }
];

export const CURRICULUM: Module[] = [
  // --- MODULE 1 ---
  {
    id: 'module-1',
    categoryId: 'compose',
    title: '第一章：声明式 UI 基础与布局系统',
    description: '掌握 Jetpack Compose 的核心函数式编程模型，理解 UI 树的生成机制。',
    difficulty: Difficulty.BEGINNER,
    iconName: 'Layout',
    sections: [
      {
        id: 'section-1-1',
        title: '1.1 可组合函数 (Composable Functions)',
        description: '核心能力：定义 UI 节点与参数传递。',
        lessons: [
          {
            id: 'lesson-1-1-1',
            title: '1.1.1 @Composable 注解与函数定义',
            description: '理解 Compose 编译器插件的作用、函数限制及无返回值特性。',
            order: 1,
            content: `
# 1.1.1 @Composable 注解与函数定义

## 理论核心
- **Compose 编译器插件**：将带有 \`@Composable\` 注解的 Kotlin 函数转换为 UI 节点发射器。
- **函数限制**：\`@Composable\` 函数只能被其他 \`@Composable\` 函数调用。
- **无返回值**：UI 函数通常返回 \`Unit\`，通过发射 UI 节点构建树结构。

\`\`\`kotlin
@Composable
fun SimpleText() {
    Text("Hello")
}
\`\`\`
            `,
            // 漫话版（含图片）：无 @ 的 Spellbook 文件
            contentUrl: '/compose/1.1.1/1.1.1 Composable_Spellbook.md',
            quiz: {
              id: 'quiz-1-1-1',
              question: '如果在普通函数 (非 Composable) 中调用 Text() 组件，会发生什么？',
              explanation: 'Compose 编译器会报错。因为 Text() 是一个 @Composable 函数，它依赖于 Composer 上下文，只能在其他 @Composable 函数的作用域内被调用。',
              options: [
                { id: 'a', text: '可以正常运行', isCorrect: false },
                { id: 'b', text: '编译器报错', isCorrect: true },
                { id: 'c', text: '运行时崩溃', isCorrect: false }
              ]
            },
            challenge: {
              id: 'ch-1-1-1',
              title: '实践作业：定义 SimpleText',
              description: '定义一个名为 `SimpleText` 的 Composable 函数。在函数内部调用系统组件 `Text`，显示内容 "Hello Compose"。',
              hints: ['记得加上 @Composable 注解', 'Text 组件需要传入 text 参数'],
              starterCode: `
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

// TODO: 定义 SimpleText 函数
              `,
              solutionCode: `
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

@Composable
fun SimpleText() {
    Text(text = "Hello Compose")
}
              `
            }
          },
          {
            id: 'lesson-1-1-2',
            title: '1.1.2 数据驱动 UI',
            description: '掌握函数参数即 UI 状态、声明式范式及幂等性概念。',
            order: 2,
            // 漫话版：无 @ 的 1.1.2.md，文字指南从 1.1.2@*.md 推导
            contentUrl: '/compose/1.1.2/1.1.2.md',
            content: `
# 1.1.2 数据驱动 UI

## 理论核心
- **函数参数即 UI 状态**。
- **声明式范式**：通过改变函数参数来更新 UI，而不是调用 \`setText()\` 等 Setter 方法。
- **幂等性**：给定相同的参数，函数应始终生成相同的 UI 结构。

\`\`\`kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}
\`\`\`
            `,
            challenge: {
              id: 'ch-1-1-2',
              title: '实践作业：参数化 UI',
              description: '修改函数 `Greeting`，使其接收一个 `name: String` 参数，并显示 "Hello, $name!"。',
              hints: ['使用字符串模板 "$name"'],
              starterCode: `
@Composable
fun Greeting(name: String) {
    // TODO: 使用 Text 显示参数
}
              `,
              solutionCode: `
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}
              `
            }
          }
        ]
      },
      {
        id: 'section-1-2',
        title: '1.2 线性布局容器 (Linear Layout Containers)',
        description: '核心能力：掌握笛卡尔坐标系下的垂直与水平排列。',
        lessons: [
          {
            id: 'lesson-1-2-1',
            title: '1.2.1 垂直排列 (Column)',
            description: '掌握 Column 组件的布局算法与尺寸行为。',
            order: 3,
            content: `
# 1.2.1 垂直排列 (Column)

## 理论核心
- **Column**：沿 Y 轴依次放置子元素。
- **默认尺寸**：宽度包裹内容 (Wrap Content)，高度包裹内容。
            `,
            // 漫话版：无 @ 的 1.2.1.md
            contentUrl: '/compose/1.2.1/1.2.1.md',
            quiz: {
                id: 'quiz-1-2-1',
                question: 'Column 默认的宽度行为是什么？',
                explanation: 'Column 默认宽度包裹内容 (Wrap Content)，除非使用 Modifier.fillMaxWidth()。',
                options: [
                    { id: 'a', text: '填充父容器 (Match Parent)', isCorrect: false },
                    { id: 'b', text: '包裹内容 (Wrap Content)', isCorrect: true }
                ]
            }
          },
          {
            id: 'lesson-1-2-2',
            title: '1.2.2 水平排列 (Row)',
            description: '掌握 Row 组件的布局算法与基线对齐。',
            order: 4,
            content: `
# 1.2.2 水平排列 (Row)

## 理论核心
- **Row**：沿 X 轴依次放置子元素。
- **默认对齐**：垂直方向上默认遵循基线对齐。

### 示例：音乐播放条
[[PREVIEW:SongRow]]
            `,
            // 漫话版：无 @ 的 1.2.2.md
            contentUrl: '/compose/1.2.2/1.2.2.md',
            challenge: {
              id: 'ch-1-2-2',
              title: '实践作业：构建用户标签',
              description: '使用 `Row` 水平排列一个 `Icon` (使用 Icons.Default.Person) 和一个 `Text` (显示用户名)。',
              hints: ['Row {}', 'Icon', 'Text'],
              starterCode: `
@Composable
fun UserLabel() {
    // TODO: 使用 Row 排列 Icon 和 Text
}
              `,
              solutionCode: `
@Composable
fun UserLabel() {
    Row {
        Icon(Icons.Default.Person, null)
        Text("User Name")
    }
}
              `
            }
          },
          {
            id: 'lesson-1-2-3',
            title: '1.2.3 叠加排列 (Box)',
            description: '掌握 Box 组件沿 Z 轴堆叠元素的特性。',
            order: 5,
            content: '# 1.2.3 叠加排列 (Box)\n\nBox 类似于 FrameLayout，沿 Z 轴堆叠元素。',
            // 漫话版：无 @ 的 1.2.3.md
            contentUrl: '/compose/1.2.3/1.2.3.md'
          }
        ]
      },
      {
        id: 'section-1-3',
        title: '1.3 布局对齐策略 (Alignment & Arrangement)',
        description: '核心能力：控制子元素在容器内的分布逻辑。',
        lessons: [
          // 1.3.1 目前只有 @ 文本版，先不配置 contentUrl，后续有漫画版再补
          {
            id: 'lesson-1-3-1',
            title: '1.3.1 主轴与交叉轴概念',
            description: 'MainAxis vs CrossAxis',
            order: 6,
            content: 'Placeholder Content',
            contentUrl: '/compose/1.3.1/1.3.1.md',
            quiz: {
              id: 'quiz-1-3-1',
              question: '在 Column（垂直布局）中，如果你想让所有的子元素水平居中显示。你应该设置哪个属性？',
              explanation: 'Column 是竖着排的。水平方向对于 Column 来说是交叉轴。管交叉轴的是 Alignment。水平方向对应 Horizontal。所以选 horizontalAlignment。',
              options: [
                { id: 'a', text: 'verticalArrangement = Arrangement.Center', isCorrect: false },
                { id: 'b', text: 'horizontalArrangement = Arrangement.Center', isCorrect: false },
                { id: 'c', text: 'horizontalAlignment = Alignment.CenterHorizontally', isCorrect: true },
                { id: 'd', text: 'verticalAlignment = Alignment.CenterVertically', isCorrect: false }
              ]
            },
            challenge: {
              id: 'ch-1-3-1',
              title: '实践作业：修复“歪歪扭扭”的布局',
              description: '修改 Column 的参数，添加 horizontalAlignment，让长短不一的文字都完美地沿着屏幕的中轴线居中。',
              hints: ['Column 的交叉轴是水平方向', '使用 horizontalAlignment'],
              starterCode: `
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun AlignmentTest() {
    // TODO: 让文字水平居中
    Column(modifier = Modifier.fillMaxWidth()) {
        Text("第一行：短")
        Text("第二行：稍微长一点")
        Text("第三行：超级超级长长长长")
    }
}
              `,
              solutionCode: `
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier

@Composable
fun AlignmentTest() {
    Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("第一行：短")
        Text("第二行：稍微长一点")
        Text("第三行：超级超级长长长长")
    }
}
              `
            }
          },
          // 1.3.2 / 1.3.3 有无 @ 的 1.3.2.md / 1.3.3.md 作为漫话版
          {
            id: 'lesson-1-3-2',
            title: '1.3.2 主轴分布模式',
            description: 'Arrangement Modes',
            order: 7,
            content: 'Placeholder Content',
            contentUrl: '/compose/1.3.2/1.3.2.md',
            quiz: {
              id: 'quiz-1-3-2',
              question: '你想做一个 App 的底部导航栏 (BottomBar)，里面有“首页”、“发现”、“我的”三个图标。你希望这三个图标在宽度上均匀分布，且最左边的图标离左屏幕边缘有一定的距离，最右边的图标离右屏幕边缘也有距离。但中间的间距不用特别大。通常推荐用哪种 Arrangement？',
              explanation: 'SpaceAround 会在两头留出一半的间距，视觉上更透气，是导航栏的经典做法。SpaceBetween 会紧贴边缘，太挤。',
              options: [
                { id: 'a', text: 'Arrangement.SpaceBetween', isCorrect: false },
                { id: 'b', text: 'Arrangement.SpaceAround', isCorrect: true },
                { id: 'c', text: 'Arrangement.Center', isCorrect: false }
              ]
            },
            challenge: {
              id: 'ch-1-3-2',
              title: '实践作业：对比 SpaceBetween 和 SpaceEvenly',
              description: '在一个 Column 中创建两个 Row，分别使用 Arrangement.SpaceBetween 和 Arrangement.SpaceEvenly 排列三个方块，观察它们的区别。',
              hints: ['Row 需要 fillMaxWidth 才有空间分配', 'SpaceBetween 两头没空隙', 'SpaceEvenly 空隙均分'],
              starterCode: `
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun ArrangementTest() {
    Column(modifier = Modifier.fillMaxSize()) {
        // TODO: 第一行使用 SpaceBetween
        Row(
            modifier = Modifier.fillMaxWidth().background(Color.LightGray),
            // horizontalArrangement = ?
        ) {
            Box(modifier = Modifier.size(50.dp).background(Color.Blue))
            Box(modifier = Modifier.size(50.dp).background(Color.Blue))
            Box(modifier = Modifier.size(50.dp).background(Color.Blue))
        }

        Spacer(modifier = Modifier.height(20.dp))

        // TODO: 第二行使用 SpaceEvenly
        Row(
            modifier = Modifier.fillMaxWidth().background(Color.LightGray),
            // horizontalArrangement = ?
        ) {
            Box(modifier = Modifier.size(50.dp).background(Color.Blue))
            Box(modifier = Modifier.size(50.dp).background(Color.Blue))
            Box(modifier = Modifier.size(50.dp).background(Color.Blue))
        }
    }
}
              `,
              solutionCode: `
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun ArrangementTest() {
    Column(modifier = Modifier.fillMaxSize()) {
        Row(
            modifier = Modifier.fillMaxWidth().background(Color.LightGray),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Box(modifier = Modifier.size(50.dp).background(Color.Blue))
            Box(modifier = Modifier.size(50.dp).background(Color.Blue))
            Box(modifier = Modifier.size(50.dp).background(Color.Blue))
        }

        Spacer(modifier = Modifier.height(20.dp))

        Row(
            modifier = Modifier.fillMaxWidth().background(Color.LightGray),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            Box(modifier = Modifier.size(50.dp).background(Color.Blue))
            Box(modifier = Modifier.size(50.dp).background(Color.Blue))
            Box(modifier = Modifier.size(50.dp).background(Color.Blue))
        }
    }
}
              `
            }
          },
          {
            id: 'lesson-1-3-3',
            title: '1.3.3 交叉轴对齐模式',
            description: 'Alignment Modes',
            order: 8,
            content: 'Placeholder Content',
            contentUrl: '/compose/1.3.3/1.3.3.md',
            quiz: {
              id: 'quiz-1-3-3',
              question: '如果 Row 设置了 verticalAlignment = Alignment.Top，但其中一个子元素 Text 设置了 Modifier.align(Alignment.Bottom)。最终这个 Text 会在哪里？',
              explanation: '子元素的 Modifier 优先级 > 父容器的默认设置。这就是“特立独行”的规则。',
              options: [
                { id: 'a', text: '顶部 (Top)', isCorrect: false },
                { id: 'b', text: '底部 (Bottom)', isCorrect: true },
                { id: 'c', text: '居中 (Center)', isCorrect: false }
              ]
            },
            challenge: {
              id: 'ch-1-3-3',
              title: '实践作业：制作一个“垂直居中”的列表项',
              description: '创建一个高度为 100dp 的 Row，默认垂直居中。放置三个方块，前两个跟随默认居中，第三个使用 align(Alignment.Bottom) 靠底对齐。',
              hints: ['使用 Modifier.align() 覆盖默认对齐'],
              starterCode: `
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun AlignmentLab() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .height(100.dp)
            .background(Color.LightGray),
        verticalAlignment = Alignment.CenterVertically
    ) {
        // 1. 红色方块（居中）
        Box(modifier = Modifier.size(40.dp).background(Color.Red))
        
        Spacer(modifier = Modifier.width(10.dp))

        // 2. 绿色方块（居中）
        Box(modifier = Modifier.size(40.dp).background(Color.Green))

        Spacer(modifier = Modifier.width(10.dp))

        // 3. TODO: 蓝色方块（靠底）
        Box(
            modifier = Modifier
                .size(40.dp)
                .background(Color.Blue)
        )
    }
}
              `,
              solutionCode: `
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun AlignmentLab() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .height(100.dp)
            .background(Color.LightGray),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(modifier = Modifier.size(40.dp).background(Color.Red))
        Spacer(modifier = Modifier.width(10.dp))
        Box(modifier = Modifier.size(40.dp).background(Color.Green))
        Spacer(modifier = Modifier.width(10.dp))
        Box(
            modifier = Modifier
                .size(40.dp)
                .background(Color.Blue)
                .align(Alignment.Bottom)
        )
    }
}
              `
            }
          }
        ]
      },
      {
        id: 'section-1-4',
        title: '1.4 修饰符系统 (The Modifier System)',
        description: '核心能力：使用装饰器模式配置组件的外观与行为。',
        lessons: [
          // 1.4.1 / 1.4.2 有无 @ 的 1.4.1.md / 1.4.2.md 作为漫话版
          {
            id: 'lesson-1-4-1',
            title: '1.4.1 尺寸约束与边距背景',
            description: 'Sizing Constraints',
            order: 9,
            content: 'Placeholder Content',
            contentUrl: '/compose/1.4.1/1.4.1.md',
            quiz: {
              id: 'quiz-1-4-1',
              question: '请脑补以下代码生成的图形：\n\nBox(\n    modifier = Modifier\n        .padding(10.dp)       // A\n        .background(Color.Blue) // B\n        .padding(20.dp)       // C\n        .background(Color.Green) // D\n)',
              explanation: '按洋葱皮顺序剥开：1. padding(10.dp)：最外层先留白 10dp（模拟 Margin）。2. background(Blue)：在剩下的区域涂蓝色。3. padding(20.dp)：在蓝色区域内，再向内缩 20dp。4. background(Green)：在剩下的核心区域涂绿色。最终效果：空白 -> 蓝环 -> 绿芯。',
              options: [
                { id: 'a', text: '一个蓝色的方块，里面套一个绿色的方块。最外面有 10dp 的空白。', isCorrect: true },
                { id: 'b', text: '一个绿色的方块，里面套一个蓝色的方块。', isCorrect: false },
                { id: 'c', text: '只有绿色方块，蓝色被盖住了。', isCorrect: false }
              ]
            },
            challenge: {
              id: 'ch-1-4-1',
              title: '实践作业：制作“胶囊按钮”样式',
              description: '使用 Modifier 顺序技巧，制作一个文本按钮：黑框（最外层） -> 白框（中间层） -> 红框（核心背景） -> 文字。',
              hints: ['Modifier 的执行顺序是从外向内的', '先写外层的 padding/background'],
              starterCode: `
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun PaddingLab() {
    Text(
        text = "点我",
        color = Color.White,
        modifier = Modifier
            // TODO: 按照 黑 -> 白 -> 红 的顺序添加 background 和 padding
    )
}
              `,
              solutionCode: `
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun PaddingLab() {
    Text(
        text = "点我",
        color = Color.White,
        modifier = Modifier
            .background(Color.Black)
            .padding(2.dp)
            .background(Color.White)
            .padding(4.dp)
            .background(Color.Red)
            .padding(horizontal = 16.dp, vertical = 8.dp)
    )
}
              `
            }
          },
          {
            id: 'lesson-1-4-2',
            title: '1.4.2 形状裁剪与点击',
            description: 'Padding & Background',
            order: 10,
            content: 'Placeholder Content',
            contentUrl: '/compose/1.4.2/1.4.2.md',
            quiz: {
              id: 'quiz-1-4-2',
              question: '如果你给一个圆角的卡片添加点击事件，发现水波纹是矩形的（超出了圆角边界），很难看。怎么解决？',
              explanation: '先裁剪，再监听点击。Modifier.clip().clickable()。这样 clickable 拿到的就是已经被裁剪过的区域。',
              options: [
                { id: 'a', text: '没办法，水波纹默认就是矩形。', isCorrect: false },
                { id: 'b', text: '把 clip(RoundedCornerShape) 放在 clickable 的前面。', isCorrect: true },
                { id: 'c', text: '把 clip(RoundedCornerShape) 放在 clickable 的后面。', isCorrect: false }
              ]
            },
            challenge: {
              id: 'ch-1-4-2',
              title: '实践作业：完美的列表项',
              description: '制作一个可点击的列表项：圆角矩形，点击时水波纹也是圆角的，且内容与边界有 Padding。',
              hints: ['Modifier 顺序：clip -> background -> clickable -> padding'],
              starterCode: `
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun ClickableItem() {
    Row(
        modifier = Modifier
            // TODO: 调整顺序，实现圆角水波纹
            .fillMaxWidth()
            .padding(16.dp)
            .background(Color.LightGray)
            .clip(RoundedCornerShape(8.dp))
            .clickable { println("Clicked!") }
    ) {
        Text("这是一个可点击的卡片")
    }
}
              `,
              solutionCode: `
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun ClickableItem() {
    Row(
        modifier = Modifier
            .clip(RoundedCornerShape(8.dp))
            .background(Color.LightGray)
            .clickable { 
                println("点击了条目！")
            }
            .padding(16.dp)
            .fillMaxWidth()
    ) {
        Text("这是一个可点击的卡片")
    }
}
              `
            }
          }
        ]
      }
    ]
  },

  // --- MODULE 2 ---
  {
    id: 'module-2',
    categoryId: 'compose',
    title: '第二章：状态管理与交互机制',
    description: '掌握 Compose 的核心响应式机制，理解重组（Recomposition）的触发原理。',
    difficulty: Difficulty.INTERMEDIATE,
    iconName: 'Zap',
    sections: [
      {
        id: 'section-2-1',
        title: '2.1 响应式状态基础',
        description: '核心能力：将普通变量转换为可被 UI 观察的数据源。',
        lessons: [
          {
            id: 'lesson-2-1-1',
            title: '2.1.1 MutableState 接口与状态创建',
            description: '理解普通变量与可观察状态的区别。',
            order: 1,
            content: `
# 2.1.1 MutableState 接口与状态创建

## 理论核心
- **断裂**：普通变量 (\`var count = 0\`) 赋值无法通知系统刷新。
- **连接**：\`mutableStateOf(value)\` 创建可观察状态，Compose 自动追踪 \`.value\` 的读取。

\`\`\`kotlin
val count = remember { mutableStateOf(0) }
Button(onClick = { count.value++ }) { Text("\${count.value}") }
\`\`\`
            `,
            contentUrl: '/compose/2.1.1/2.1.1@MutableState 接口与状态创建.md',
            quiz: {
              id: 'quiz-2-1-1',
              question: '在一个 Button 的 onClick 中执行 count++，其中 count 是一个普通的 Int 变量。界面会刷新吗？',
              explanation: '不会。普通变量的变化无法被 Compose 运行时监测到。必须使用 MutableState。',
              options: [
                { id: 'a', text: '会刷新', isCorrect: false },
                { id: 'b', text: '不会刷新', isCorrect: true }
              ]
            }
          },
          {
            id: 'lesson-2-1-2',
            title: '2.1.2 属性委托语法',
            description: '使用 by 关键字简化状态读写。',
            order: 2,
            content: `
# 2.1.2 属性委托语法

## 理论核心
- **Kotlin 委托**：使用 \`by\` 关键字将属性读写委托给 State 对象。
- **语法糖**：直接读写 \`count\` 而非 \`count.value\`。

### 互动演示：会变大的苹果
[[PREVIEW:GrowingApple]]
            `,
            contentUrl: '/compose/2.1.2/2.1.2@属性委托语法 (Property Delegation).md',
            challenge: {
              id: 'ch-2-1-2',
              title: '实践作业：属性委托计数器',
              description: '使用 `by remember { mutableStateOf(0) }` 创建计数器。',
              hints: ['import getValue', 'import setValue'],
              starterCode: `
@Composable
fun Counter() {
    // TODO: 使用 by 创建状态
}
              `,
              solutionCode: `
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) { Text("$count") }
}
              `
            }
          }
        ]
      },
      {
        id: 'section-2-2',
        title: '2.2 重组机制与作用域',
        description: '核心能力：理解 UI 刷新的范围与成本。',
        lessons: [
          { id: 'lesson-2-2-1', title: '2.2.1 重组触发原理', description: 'Triggering Recomposition', order: 3, content: 'Placeholder', contentUrl: '/compose/2.2.1/2.2.1@重组触发原理 (Triggering Recomposition).md' },
          { id: 'lesson-2-2-2', title: '2.2.2 智能跳过', description: 'Intelligent Skipping', order: 4, content: 'Placeholder', contentUrl: '/compose/2.2.2/2.2.2@智能跳过 (Intelligent Skipping).md' }
        ]
      },
      {
        id: 'section-2-3',
        title: '2.3 组合内持久化',
        description: '核心能力：在函数反复执行的过程中保留数据。',
        lessons: [
          { id: 'lesson-2-3-1', title: '2.3.1 remember 函数', description: 'Positional Memoization', order: 5, content: 'Placeholder', contentUrl: '/compose/2.3.1/2.3.1@remember 函数 (Positional Memoization).md' },
          { id: 'lesson-2-3-2', title: '2.3.2 配置变更持久化', description: 'rememberSaveable', order: 6, content: 'Placeholder', contentUrl: '/compose/2.3.2/2.3.2@配置变更持久化 (rememberSaveable).md' }
        ]
      },
      {
        id: 'section-2-4',
        title: '2.4 状态流向与架构',
        description: '核心能力：解耦 UI 展示与状态逻辑。',
        lessons: [
          { id: 'lesson-2-4-1', title: '2.4.1 单向数据流模式 (UDF)', description: 'Unidirectional Data Flow', order: 7, content: 'Placeholder', contentUrl: '/compose/2.4.1/2.4.1@单向数据流模式 (Unidirectional Data Flow - UDF).md' },
          { id: 'lesson-2-4-2', title: '2.4.2 状态提升 (State Hoisting)', description: 'State Hoisting', order: 8, content: 'Placeholder', contentUrl: '/compose/2.4.2/2.4.2@状态提升 (State Hoisting).md' }
        ]
      }
    ]
  },

  // --- MODULE 3 ---
  {
    id: 'module-3',
    categoryId: 'compose',
    title: '第三章：动态组件与标准化构建',
    description: '掌握处理动态数据集（列表）的核心技术，学会使用插槽模式。',
    difficulty: Difficulty.INTERMEDIATE,
    iconName: 'List',
    sections: [
      {
        id: 'section-3-1',
        title: '3.1 惰性列表系统 (Lazy Layout System)',
        description: '核心能力：高效渲染海量数据，理解视口虚拟化机制。',
        lessons: [
          { id: 'lesson-3-1-1', title: '3.1.1 LazyColumn 基础与 DSL', description: 'LazyColumn', order: 1, content: 'Placeholder' },
          { id: 'lesson-3-1-2', title: '3.1.2 异构列表与状态复用', description: 'Heterogeneous Lists', order: 2, content: 'Placeholder' },
          { id: 'lesson-3-1-3', title: '3.1.3 滚动控制与吸顶', description: 'Scroll Control', order: 3, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-3-2',
        title: '3.2 组件架构设计',
        description: '核心能力：使用插槽模式编写高复用性的容器组件。',
        lessons: [
          { id: 'lesson-3-2-1', title: '3.2.1 插槽 API 模式', description: 'Slot API', order: 4, content: 'Placeholder' },
          { id: 'lesson-3-2-2', title: '3.2.2 脚手架系统 (Scaffold)', description: 'Scaffold', order: 5, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-3-3',
        title: '3.3 Material Design 交互组件',
        description: '核心能力：熟练使用文本输入与标准交互控件。',
        lessons: [
          { id: 'lesson-3-3-1', title: '3.3.1 文本输入框', description: 'TextField', order: 6, content: 'Placeholder' },
          { id: 'lesson-3-3-2', title: '3.3.2 按钮与点击反馈', description: 'Buttons', order: 7, content: 'Placeholder' },
          { id: 'lesson-3-3-3', title: '3.3.3 图片与图标', description: 'Images & Icons', order: 8, content: 'Placeholder' }
        ]
      }
    ]
  },

  // --- MODULE 4 ---
  {
    id: 'module-4',
    categoryId: 'architecture',
    title: '第四章：副作用管理与架构集成',
    description: '掌握 Compose 的“逃生舱”机制，构建 MVVM 架构。',
    difficulty: Difficulty.ADVANCED,
    iconName: 'Activity',
    sections: [
      {
        id: 'section-4-1',
        title: '4.1 组合生命周期与副作用',
        description: '核心能力：在声明式 UI 框架中安全地执行命令式代码。',
        lessons: [
          { id: 'lesson-4-1-1', title: '4.1.1 副作用概念 (LaunchedEffect)', description: 'LaunchedEffect', order: 1, content: 'Placeholder', contentUrl: '/compose/4.1.1/4.1.1@副作用概念与受控执行 (LaunchedEffect).md' },
          { id: 'lesson-4-1-2', title: '4.1.2 协程作用域', description: 'rememberCoroutineScope', order: 2, content: 'Placeholder', contentUrl: '/compose/4.1.2/4.1.2@组合感知的协程作用域 (rememberCoroutineScope).md' },
          { id: 'lesson-4-1-3', title: '4.1.3 资源清理效应', description: 'DisposableEffect', order: 3, content: 'Placeholder', contentUrl: '/compose/4.1.3/4.1.3@资源清理效应 (DisposableEffect).md' }
        ]
      },
      {
        id: 'section-4-2',
        title: '4.2 状态转换与快照流',
        description: '核心能力：连接 Compose 状态系统与 Kotlin 协程流系统。',
        lessons: [
          { id: 'lesson-4-2-1', title: '4.2.1 衍生状态 (derivedStateOf)', description: 'derivedStateOf', order: 4, content: 'Placeholder' },
          { id: 'lesson-4-2-2', title: '4.2.2 状态转数据流 (snapshotFlow)', description: 'snapshotFlow', order: 5, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-4-3',
        title: '4.3 架构模式集成',
        description: '核心能力：构建 MVVM 架构，分离关注点。',
        lessons: [
          { id: 'lesson-4-3-1', title: '4.3.1 ViewModel 集成', description: 'ViewModel', order: 6, content: 'Placeholder' },
          { id: 'lesson-4-3-2', title: '4.3.2 界面状态建模', description: 'UI State', order: 7, content: 'Placeholder' },
          { id: 'lesson-4-3-3', title: '4.3.3 事件回调处理', description: 'Events', order: 8, content: 'Placeholder' }
        ]
      }
    ]
  },

  // --- MODULE 5 ---
  {
    id: 'module-5',
    categoryId: 'compose',
    title: '第五章：导航系统与高级交互',
    description: '构建真正的多页面应用程序，掌握声明式导航图的配置。',
    difficulty: Difficulty.ADVANCED,
    iconName: 'Compass',
    sections: [
      {
        id: 'section-5-1',
        title: '5.1 声明式导航系统',
        description: '核心能力：管理应用内的页面路由、参数传递与返回栈。',
        lessons: [
          { id: 'lesson-5-1-1', title: '5.1.1 导航图配置', description: 'NavHost', order: 1, content: 'Placeholder' },
          { id: 'lesson-5-1-2', title: '5.1.2 路由参数传递', description: 'Arguments', order: 2, content: 'Placeholder' },
          { id: 'lesson-5-1-3', title: '5.1.3 导航选项与清理', description: 'Options', order: 3, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-5-2',
        title: '5.2 声明式动画系统',
        description: '核心能力：让界面状态的变化过程可视化、平滑化。',
        lessons: [
          { id: 'lesson-5-2-1', title: '5.2.1 简单值动画', description: 'animate*AsState', order: 4, content: 'Placeholder' },
          { id: 'lesson-5-2-2', title: '5.2.2 布局内容动画', description: 'Content Animation', order: 5, content: 'Placeholder' },
          { id: 'lesson-5-2-3', title: '5.2.3 复杂过渡动画', description: 'Transition API', order: 6, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-5-3',
        title: '5.3 手势交互系统',
        description: '核心能力：处理点击、拖拽、滑动等原生触摸事件。',
        lessons: [
          { id: 'lesson-5-3-1', title: '5.3.1 高级点击与交互', description: 'PointerInput', order: 7, content: 'Placeholder' },
          { id: 'lesson-5-3-2', title: '5.3.2 拖拽与滑动', description: 'Draggable', order: 8, content: 'Placeholder' }
        ]
      }
    ]
  },

  // --- MODULE 6 ---
  {
    id: 'module-6',
    categoryId: 'architecture',
    title: '第六章：性能调优与架构精进',
    description: '掌握 Compose 的底层渲染原理，学会诊断卡顿。',
    difficulty: Difficulty.ADVANCED,
    iconName: 'Cpu',
    sections: [
      {
        id: 'section-6-1',
        title: '6.1 智能重组与稳定性',
        description: '核心能力：理解 Compose 编译器如何决定“跳过”还是“重绘”。',
        lessons: [
          { id: 'lesson-6-1-1', title: '6.1.1 稳定性契约', description: 'Stability', order: 1, content: 'Placeholder' },
          { id: 'lesson-6-1-2', title: '6.1.2 强制稳定化技巧', description: 'Stabilization', order: 2, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-6-2',
        title: '6.2 渲染阶段优化',
        description: '核心能力：利用 Compose 的三个阶段来规避重组。',
        lessons: [
          { id: 'lesson-6-2-1', title: '6.2.1 延迟读取', description: 'Deferring', order: 3, content: 'Placeholder' },
          { id: 'lesson-6-2-2', title: '6.2.2 衍生状态优化', description: 'derivedStateOf', order: 4, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-6-3',
        title: '6.3 自定义绘制与布局',
        description: '核心能力：直接操作底层画布和测量系统。',
        lessons: [
          { id: 'lesson-6-3-1', title: '6.3.1 自定义布局', description: 'Layout', order: 5, content: 'Placeholder' },
          { id: 'lesson-6-3-2', title: '6.3.2 Canvas 绘图系统', description: 'Canvas', order: 6, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-6-4',
        title: '6.4 互操作性',
        description: '核心能力：在旧项目中逐步迁移到 Compose。',
        lessons: [
          { id: 'lesson-6-4-1', title: '6.4.1 Compose 中嵌入 View', description: 'AndroidView', order: 7, content: 'Placeholder' },
          { id: 'lesson-6-4-2', title: '6.4.2 View 中嵌入 Compose', description: 'ComposeView', order: 8, content: 'Placeholder' }
        ]
      }
    ]
  },

  // --- MODULE 7 ---
  {
    id: 'module-7',
    categoryId: 'architecture',
    title: '第七章：全栈项目实战与工程化',
    description: '构建一个具有复杂业务逻辑、网络层、持久层和良好架构的完整 App。',
    difficulty: Difficulty.ADVANCED,
    iconName: 'Layers',
    sections: [
      {
        id: 'section-7-1',
        title: '7.1 应用架构搭建',
        description: '核心能力：搭建符合 Google 推荐架构的工程骨架。',
        lessons: [
          { id: 'lesson-7-1-1', title: '7.1.1 模块化与依赖注入', description: 'Hilt', order: 1, content: 'Placeholder' },
          { id: 'lesson-7-1-2', title: '7.1.2 统一主题系统', description: 'Theme', order: 2, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-7-2',
        title: '7.2 网络与数据层集成',
        description: '核心能力：处理真实世界的异步数据流，实现“离线优先”体验。',
        lessons: [
          { id: 'lesson-7-2-1', title: '7.2.1 Retrofit 与 Paging 3', description: 'Retrofit', order: 3, content: 'Placeholder' },
          { id: 'lesson-7-2-2', title: '7.2.2 Room 数据库', description: 'Room', order: 4, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-7-3',
        title: '7.3 复杂交互与 UI 细节',
        description: '核心能力：处理边缘情况，提升 App 的精致度。',
        lessons: [
          { id: 'lesson-7-3-1', title: '7.3.1 共享元素转场', description: 'SharedTransition', order: 5, content: 'Placeholder' },
          { id: 'lesson-7-3-2', title: '7.3.2 沉浸式与边衬区', description: 'Edge-to-Edge', order: 6, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-7-4',
        title: '7.4 测试与发布',
        description: '核心能力：保证代码质量，编写自动化测试用例。',
        lessons: [
          { id: 'lesson-7-4-1', title: '7.4.1 单元测试', description: 'Unit Test', order: 7, content: 'Placeholder' },
          { id: 'lesson-7-4-2', title: '7.4.2 UI 测试', description: 'UI Test', order: 8, content: 'Placeholder' }
        ]
      }
    ]
  },

  // --- MODULE 8 ---
  {
    id: 'module-8',
    categoryId: 'android-basics',
    title: '第八章：互操作性与生产力黑科技',
    description: '掌握能够提升 10倍开发效率的工具链技巧。',
    difficulty: Difficulty.ADVANCED,
    iconName: 'Smartphone',
    sections: [
      {
        id: 'section-8-1',
        title: '8.1 混合开发实战',
        description: '核心能力：在同一个 App 中让 View 系统和 Compose 系统和谐共存。',
        lessons: [
          { id: 'lesson-8-1-1', title: '8.1.1 混合开发 (AndroidView)', description: 'AndroidView', order: 1, content: 'Placeholder' },
          { id: 'lesson-8-1-2', title: '8.1.2 混合开发 (ComposeView)', description: 'ComposeView', order: 2, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-8-2',
        title: '8.2 高级调试与工具链',
        description: '核心能力：利用工具快速定位布局问题和性能瓶颈。',
        lessons: [
          { id: 'lesson-8-2-1', title: '8.2.1 布局检查器', description: 'Layout Inspector', order: 3, content: 'Placeholder' },
          { id: 'lesson-8-2-2', title: '8.2.2 预览系统进阶', description: 'Previews', order: 4, content: 'Placeholder' }
        ]
      },
      {
        id: 'section-8-3',
        title: '8.3 编译器黑魔法与运行时',
        description: '核心能力：了解“水面之下”的冰山，理解 Compose 如何运作。',
        lessons: [
          { id: 'lesson-8-3-1', title: '8.3.1 编译器原理', description: 'Gap Buffer', order: 5, content: 'Placeholder' },
          { id: 'lesson-8-3-2', title: '8.3.2 自定义 CompositionLocal', description: 'CompositionLocal', order: 6, content: 'Placeholder' }
        ]
      }
    ]
  }
];
