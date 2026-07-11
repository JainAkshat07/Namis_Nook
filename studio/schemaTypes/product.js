export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Upload a clear square photo of the product.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Price (number only)",
      type: "number",
      description: "Just the amount, e.g. 149. The ₹ symbol is added automatically.",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "isNew",
      title: "New arrival?",
      type: "boolean",
      description: 'Turn on to show this under the "New Arrivals" filter.',
      initialValue: false,
    },
    { name: "size", title: "Size", type: "string" },
    { name: "materials", title: "Materials", type: "string" },
    { name: "colours", title: "Colours", type: "string" },
    { name: "care", title: "Care", type: "string" },
    {
      name: "madeToOrder",
      title: "Made to order (time)",
      type: "string",
      description: 'e.g. "3–4 days"',
    },
    {
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first. Optional.",
    },
  ],
  preview: {
    select: { title: "name", subtitle: "price", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `₹${subtitle}` : "", media };
    },
  },
};
