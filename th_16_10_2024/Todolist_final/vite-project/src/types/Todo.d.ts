export interface ItemType{
    title: string;
    date: string;
    color: string;
    state: boolean;
}

export interface ItemProps {
    title: string;
    date: string;
    color: string;
    state: boolean;
    onToggle: () => void;
}

interface TodoPieChartProps {
    data: ItemType[];
  }