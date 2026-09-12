import type { CollectionConfig } from "payload";

import { authenticated } from "../access/contentAccess";
import { populateSlug } from "../hooks/formatSlug";

export const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    group: "Taxonomy",
    useAsTitle: "title",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    { name: "title", type: "text", required: true, unique: true, maxLength: 80 },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [populateSlug] },
    },
    { name: "description", type: "textarea", maxLength: 240 },
  ],
};
