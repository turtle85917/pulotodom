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

interface Component {
  type: "Alert" | "Confirm";
  title: string | JSX.Element;
  content: React.ReactNode;
}
