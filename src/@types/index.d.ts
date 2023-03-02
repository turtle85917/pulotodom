interface Project {
  title: string;
  description: string;
  links: {
    github?: string;
    preview?: string;
    npm?: string;
  }
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
