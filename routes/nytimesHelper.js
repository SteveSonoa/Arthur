let nytimes = require('@datafire/nytimes_article_search').create({
    apikey: "a830dde6a9634e7395ffbace401c20ee"
});

module.exports = function(companyName) {
    var searchTerm = "";
    var numResults = 4;

    //retrieve the first 10 articles starting 01012018
    return nytimes.articlesearch.json.get({ q: companyName, page: 0, begin_date: "20180101" })

}