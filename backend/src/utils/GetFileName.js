exports.getFileNameFromError = (error) => {
    if (!error) return "Unknown 1";

    
    const errorString = error.toString();
    console.log("Error String:", error);
    const match = errorString.match(/([^/\s]+\.js):(\d+):(\d+)/);
    if (!match) return "Unknown 2";

    return match[1];
};