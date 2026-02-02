export const generateLink = (platform, value) => {
  if (value.startsWith("http")) return value;

  const base = {
    instagram: "https://instagram.com/",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/"
  };

  return base[platform] + value;
};