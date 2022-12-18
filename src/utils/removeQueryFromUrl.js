const removeQueryFromUrl = (name) => {
    if (window.location.href.includes(`?${name}=`)) {
        const url = window.location.href.split(`?${name}=`)[0];
        window.history.pushState({}, document.title, url);
    }
};

export default removeQueryFromUrl;
