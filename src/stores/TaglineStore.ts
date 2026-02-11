import { Tag, TaglineStyles } from "../types/tagline";
import { createElementStore } from "./ElementStore";
import { taglineConfig } from "../config/elements/tagline";

// Create tagline store using the generic element store
export const createTaglineStore = () => {
  const initialTags: Tag[] = [
    { id: "1", label: "Marketing", link: "#" },
    { id: "2", label: "Design", link: "#" },
    { id: "3", label: "Development", link: "#" },
    { id: "4", label: "Front", link: "#" },
    { id: "5", label: "AI Engineering", link: "#" },
  ];

  return createElementStore<Tag, TaglineStyles>(
    initialTags,
    taglineConfig.defaultStyles,
    'tagline',
  );
};
