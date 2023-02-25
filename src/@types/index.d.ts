interface Project {
  title: string;
  description: string;
  links: {
    github?: string;
    preview?: string;
    npm?: string;
  }
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
