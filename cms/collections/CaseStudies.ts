import type { CollectionConfig } from "payload";

import { authenticated, publishedOrAuthenticated } from "../access/contentAccess";
import { seoFields } from "../fields/seoFields";
import { editorLayout } from "../fields/editorLayout";
import { populateSlug } from "../hooks/formatSlug";

const categoryOptions = [
  "Digital Marketing",
  "Performance Marketing",
  "SEO",
  "Web Design & Development",
  "Creative & Media",
].map((category) => ({ label: category, value: category }));

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: { singular: "Case Study", plural: "Case Studies" },
  admin: {
    defaultColumns: ["title", "categoryRelation", "industry", "featured", "_status"],
    group: "Content",
    useAsTitle: "title",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  defaultSort: "sortOrder",
  fields: editorLayout([
    { name: "title", type: "text", required: true, maxLength: 160 },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
      hooks: { beforeValidate: [populateSlug] },
    },
    {
      name: "category",
      type: "select",
      options: categoryOptions,
      admin: { hidden: true },
    },
    {
      name: "categoryRelation",
      label: "Category",
      type: "relationship",
      relationTo: "case-study-categories",
      required: true,
      admin: { position: "sidebar" },
    },
    { name: "industry", type: "text", required: true, maxLength: 100, admin: { position: "sidebar" } },
    { name: "featured", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
    { name: "sortOrder", type: "number", defaultValue: 100, min: 0, admin: { position: "sidebar" } },
    { name: "summary", type: "textarea", required: true, maxLength: 420 },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { description: "Select an image with descriptive Alt Text for accessibility and SEO." },
    },
    {
      name: "services",
      type: "array",
      required: true,
      minRows: 1,
      fields: [{ name: "name", type: "text", required: true, maxLength: 100 }],
    },
    { name: "challenge", type: "richText", required: true },
    {
      name: "approach",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true, maxLength: 140 },
        { name: "description", type: "textarea", required: true, maxLength: 600 },
      ],
    },
    {
      name: "results",
      type: "array",
      fields: [
        { name: "value", type: "text", required: true, maxLength: 40 },
        { name: "label", type: "text", required: true, maxLength: 120 },
      ],
    },
    seoFields,
  ]),
  versions: {
    drafts: {
      autosave: { interval: 30000 },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
};
