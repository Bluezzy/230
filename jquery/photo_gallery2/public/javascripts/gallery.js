$(document).ready(function () {
    function setUpTemplates() {
        var templates = {};
        $("script[type='text/x-handlebars']").each(function () {
            var $tmpl = $(this);
            templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
        });

        Handlebars.registerPartial("comment", $("#comment").html());
        return templates;
    }

    function getCommentsFor(photoId) {
        $.ajax({
            method: "GET",
            url: "comments?photo_id=" + photoId,
        }).done(function (comments) {
            var commentsHtml = templates.comments({ comments: comments });
            $("#comments > ul").html(commentsHtml);
        });
    }

    function renderPhotos() {
        var photosHtml = templates.photos({ photos: photos });
        $("#slides").html(photosHtml);
    }

    function renderPhotoInformation(idx) {
        var photo = photos.filter(function (item) {
            return item.id === idx;
        })[0];
        var photoInformationHtml = templates.photo_information(photo);
        $("section > header").html(photoInformationHtml);
    }

    function updatePhotoIdInForm(idx) {
        $("form").find($("input[name=photo_id]")).attr('value', idx);
    }

    var templates = setUpTemplates();
    var photos;

    var slideshow = {
        $el: $("#slideshow"),
        duration: 500,
        prevSlide: function (e) {
            e.preventDefault();
            var $current = this.$el.find('figure:visible');
            var $prev = $current.prev("figure");

            if (!$prev.length) {
                $prev = this.$el.find("figure").last();
            }
            $current.fadeOut(this.duration);
            $prev.fadeIn(this.duration);
            this.renderPhotoContent($prev.attr("data-id"));
            updatePhotoIdInForm($prev.attr("data-id"));
        },
        nextSlide: function (e) {
            e.preventDefault();
            var $current = this.$el.find('figure:visible');
            var $next = $current.next("figure");

            if (!$next.length) {
                $next = this.$el.find("figure").first();
            }
            $current.fadeOut(this.duration);
            $next.fadeIn(this.duration);
            this.renderPhotoContent($next.attr("data-id"));
            updatePhotoIdInForm($next.attr("data-id"));
        },
        renderPhotoContent(photoId) {
            renderPhotoInformation(+photoId);
            getCommentsFor(+photoId)
        },
        bind: function () {
            this.$el.find("a.prev").on("click", this.prevSlide.bind(this));
            this.$el.find("a.next").on("click", this.nextSlide.bind(this));
        },
        init: function () {
            this.bind();
        },
    };

    $.ajax({
        method: "GET",
        url: "/photos",
    }).done(function (json) {
        photos = json;
        renderPhotos();
        renderPhotoInformation(photos[0].id);
        slideshow.init();
        getCommentsFor(photos[0].id);

        $("form").on("click", "input.button", function (e) {
            e.preventDefault();
            var formData = $("form").serializeArray();
            $.ajax({
                method: "POST",
                url: "/comments/new",
                data: formData,
            }).done(function (response) {
                getCommentsFor(response.photo_id);
            });
        });

    });
});