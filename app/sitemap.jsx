export const metadata = {
  title: "Sitemap",
};

export default function sitemap() {
  const routes = ["", "contact", "resume", "services", "work"];

  return [...routes].map((route) => ({
    url: `https://durveshmore.vercel.app/${route}`,
    lastModified: new Date(),
  }));
}
