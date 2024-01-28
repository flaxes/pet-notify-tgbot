module.exports = (context) => (err) => {
    console.error(new Date().toLocaleString(), `[${context}]`, err);
};
