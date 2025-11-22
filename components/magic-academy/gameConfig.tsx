import React from 'react';
import {
  LayoutTemplate,
  Wand2,
  GraduationCap,
  Sparkles,
  Film,
  Layers,
  AlignHorizontalSpaceAround,
  SplitSquareHorizontal,
  Box,
  ArrowUpFromLine,
  MousePointerClick,
  Scissors,
  ScrollText,
} from 'lucide-react';
import { GameId } from './types';

export interface MagicGameConfig {
  id: GameId;
  /** 用于排序的序号，例如 111 = 1.1.1 */
  order: number;
  /** 小节编号展示，如 "1.1.1 魔法入门" */
  title: string;
  /** 副标题说明 */
  description: string;
  /** 右下角徽章文字 */
  tag: string;
  /** 卡片 hover 边框颜色类，如 "hover:border-purple-200" */
  hoverBorderClass: string;
  /** 右上角圆形背景色，如 "bg-purple-100" */
  accentBgClass: string;
  /** 图标容器背景色，如 "bg-purple-100" */
  iconBgClass: string;
  /** 图标颜色类，如 "text-purple-600" */
  iconTextClass: string;
  /** 徽章文字颜色类，如 "text-purple-600" */
  tagTextClass: string;
  /** Lucide 图标节点 */
  icon: React.ReactNode;
}

export const MAGIC_GAMES: MagicGameConfig[] = [
  {
    id: 'COMPOSE_INTRO',
    order: 111,
    title: '1.1.1 魔法入门',
    description: '声明式 vs 命令式，施展 @Composable 咒语。',
    tag: '基础概念',
    hoverBorderClass: 'hover:border-amber-200',
    accentBgClass: 'bg-amber-100',
    iconBgClass: 'bg-amber-100',
    iconTextClass: 'text-amber-700',
    tagTextClass: 'text-amber-700',
    icon: <Wand2 size={24} />,
  },
  {
    id: 'DATA_DRIVEN',
    order: 112,
    title: '1.1.2 数据驱动',
    description: '化身 UI 放映师，理解 UI = f(State)。',
    tag: '核心思想',
    hoverBorderClass: 'hover:border-cyan-200',
    accentBgClass: 'bg-cyan-100',
    iconBgClass: 'bg-cyan-100',
    iconTextClass: 'text-cyan-600',
    tagTextClass: 'text-cyan-600',
    icon: <Film size={24} />,
  },
  {
    id: 'COLUMN_ADVENTURE',
    order: 121,
    title: '1.2.1 Column 冒险',
    description: '垂直排列的秘密，解决堆叠危机！',
    tag: '布局基础',
    hoverBorderClass: 'hover:border-green-200',
    accentBgClass: 'bg-green-100',
    iconBgClass: 'bg-green-100',
    iconTextClass: 'text-green-600',
    tagTextClass: 'text-green-600',
    icon: <Layers size={24} />,
  },
  {
    id: 'ROW_ADVENTURE',
    order: 122,
    title: '1.2.2 Row 露营',
    description: '水平排队的魔法，领小鱼干啦！',
    tag: '布局基础',
    hoverBorderClass: 'hover:border-orange-200',
    accentBgClass: 'bg-orange-100',
    iconBgClass: 'bg-orange-100',
    iconTextClass: 'text-orange-600',
    tagTextClass: 'text-orange-600',
    icon: <AlignHorizontalSpaceAround size={24} />,
  },
  {
    id: 'BOX_ADVENTURE',
    order: 123,
    title: '1.2.3 Box 探险',
    description: 'Z 轴的堆叠艺术，制作带角标的头像！',
    tag: '布局基础',
    hoverBorderClass: 'hover:border-indigo-200',
    accentBgClass: 'bg-indigo-100',
    iconBgClass: 'bg-indigo-100',
    iconTextClass: 'text-indigo-600',
    tagTextClass: 'text-indigo-600',
    icon: <Box size={24} />,
  },
  {
    id: 'SHAPE_CLIP',
    order: 141,
    title: '1.4.1 形状裁剪',
    description: '拿起魔法剪刀！Clip、Shape 与 Modifier 顺序的奥秘。',
    tag: '布局基础',
    hoverBorderClass: 'hover:border-rose-200',
    accentBgClass: 'bg-rose-100',
    iconBgClass: 'bg-rose-100',
    iconTextClass: 'text-rose-600',
    tagTextClass: 'text-rose-600',
    icon: <Scissors size={24} />,
  },
  {
    id: 'ARRANGEMENT_LAB',
    order: 131,
    title: '1.3.1 空间魔法',
    description: 'Arrangement 实验室，切分剩余空间！',
    tag: '进阶布局',
    hoverBorderClass: 'hover:border-pink-200',
    accentBgClass: 'bg-pink-100',
    iconBgClass: 'bg-pink-100',
    iconTextClass: 'text-pink-600',
    tagTextClass: 'text-pink-600',
    icon: <SplitSquareHorizontal size={24} />,
  },
  {
    id: 'ALIGNMENT_ADVENTURE',
    order: 132,
    title: '1.3.2 对齐探险',
    description: '整理玩具箱，掌握 Cross-Axis 交叉轴的奥秘！',
    tag: '进阶布局',
    hoverBorderClass: 'hover:border-teal-200',
    accentBgClass: 'bg-teal-100',
    iconBgClass: 'bg-teal-100',
    iconTextClass: 'text-teal-600',
    tagTextClass: 'text-teal-600',
    icon: <ArrowUpFromLine size={24} />,
  },
  {
    id: 'CLICK_MAGIC',
    order: 142,
    title: '1.4.2 交互魔法',
    description: '让按钮“活”起来，掌握点击与状态的联动。',
    tag: '交互基础',
    hoverBorderClass: 'hover:border-purple-200',
    accentBgClass: 'bg-purple-100',
    iconBgClass: 'bg-purple-100',
    iconTextClass: 'text-purple-600',
    tagTextClass: 'text-purple-600',
    icon: <MousePointerClick size={24} />,
  },
  {
    id: 'SUMMARY_QUIZ',
    order: 145,
    title: '1.4.3 魔法综合测验',
    description: '章节小测验，检验你是否掌握了本章的核心魔法。',
    tag: '知识巩固',
    hoverBorderClass: 'hover:border-amber-200',
    accentBgClass: 'bg-amber-100',
    iconBgClass: 'bg-amber-100',
    iconTextClass: 'text-amber-700',
    tagTextClass: 'text-amber-700',
    icon: <ScrollText size={24} />,
  },
  {
    id: 'LAYOUT_MAGIC',
    order: 133,
    title: '1.3.3 布局魔法书',
    description: '实战整合布局，用 Column / Row / Alignment 写出完整页面。',
    tag: '终极挑战',
    hoverBorderClass: 'hover:border-amber-300',
    accentBgClass: 'bg-amber-100',
    iconBgClass: 'bg-amber-100',
    iconTextClass: 'text-amber-700',
    tagTextClass: 'text-amber-700',
    icon: <LayoutTemplate size={24} />,
  },
];


