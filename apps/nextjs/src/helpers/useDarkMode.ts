
const getDarkMode = () => {
let isDarkMode
    
    if (typeof window === "undefined") {
      isDarkMode = false;
    } else {
      const mediaQueryObj = window.matchMedia("(prefers-color-scheme: dark)");
      isDarkMode = mediaQueryObj.matches;
    }
    return isDarkMode
}

export default getDarkMode