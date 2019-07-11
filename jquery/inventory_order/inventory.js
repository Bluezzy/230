var inventory;

(function () {
    inventory = {
        last_id: 0,
        collection: [],
        setDate: function () {
            var date = new Date();
            $("#order_date").text(date.toUTCString());
        },
        cacheTemplate: function () {
            var $i_tmpl = $("#inventory_item").remove();
            this.template = Handlebars.compile($i_tmpl.html());
        },
        add: function () {
            this.last_id++;
            var item = {
                id: this.last_id,
                name: "",
                stock_number: "",
                quantity: 1,
            };
            this.collection.push(item);
            return item;
        },
        remove: function (idx) {
            idx = +idx;
            this.collection = this.collection.filter(function (item) {
                return item.id !== idx;
            });
        },
        get: function (id) {
            var found_item;

            this.collection.forEach(function (item) {
                if (item.id === id) {
                    found_item = item;
                    return false;
                }
            });

            return found_item;
        },
        update: function ($item) {
            var id = +($item.find("input[type=hidden]").val());
            item = this.get(id);

            item.name = $item.find("[name^=item_name]").val();
            item.stock_number = $item.find("[name^=item_stock_number]").val();
            item.quantity = $item.find("[name^=item_quantity]").val();
        },
        newItem: function (e) {
            e.preventDefault();
            var item = this.add();
            var $item = $(this.template({ id: item.id }));

            $("#inventory").append($item);
        },
        findParent: function (e) {
            return $(e.target).closest("tr");
        },
        deleteItem: function (e) {
            e.preventDefault();
            var $item = this.findParent(e).remove();

            this.remove($item.find("input[type=hidden]").val());
        },
        updateItem: function (e) {
            var $item = this.findParent(e);

            this.update($item);
        },
        bindEvents: function () {
            $("#add_item").on("click", $.proxy(this.newItem, this));
            $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
            $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
        },
        init: function () {
            this.setDate();
            this.cacheTemplate();
            this.bindEvents();
        },
    }
})();

$(inventory.init.bind(inventory));