interface Project {
  title: string;
  description: string;
  links: {
    github?: string;
    preview?: string;
    npm?: string;
  }
}

interface TouchInfo {
  startX: number;
  startY: number;
  startTime: number;
}

type Skills = Skill[];

interface Skill {
  name: string;
  color: string;
  gradient?: string;
  tags: string[];
}

interface Navgation {
  path: string;
  onClick: () => any;
}

type ComponentType = "Alert" | "Confirm";

interface Component {
  type: ComponentType;
  title: string | JSX.Element;
  content: React.ReactNode;
}
