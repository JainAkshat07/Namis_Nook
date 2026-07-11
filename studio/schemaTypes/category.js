export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: 'Shown as the filter button, e.g. "Toys"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug (id)",
      type: "slug",
      description: 'Used internally, e.g. "toys". Click Generate.',
      options: { source: "title", maxLength: 40 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first in the filter bar.",
    },
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
};
