var post = {
    title: 'Lorem ipsum dolor sit amet',
    published: 'April 1, 2015',
    body: '<p>Sed ut perspiciatis unde omnis iste natus error</p>',
};

var post2 = {
    title: "Related to chess",
    published: "May 3, 2019",
    body: "<p>Magnus Carlsen is the best player of all time</p>",
};

post.tags = ['food', 'vegetables', 'cookies'];

var posts = [];
posts.push(post);
posts.push(post2);

$(document).ready(function () {
    Handlebars.registerPartial('tag', $('#tag').html());
    var source = $("#posts").html();
    var template = Handlebars.compile(source);
    var html = template({ posts: posts });

    $('body').append(html);
});