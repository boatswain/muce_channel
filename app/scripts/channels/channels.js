define([], function() {
    var initData = function() {
        var getChannelData = function(url) {
            var deferrd = $.Deferred();
            $.ajax({
                type : 'get',
                url : url,
                success : function(resp) {
                    deferrd.resolve(resp);
                },
                error : function(resp) {
                    errorHandler(resp);
                deferrd.reject(resp);
                }
            });
            return deferrd.promise();
        };

        var init = function() {
            var search = window.location.search;
            var url = 'channel.wandoujia.com/data/' + search.split('=')[1];

            getChannelData(url).done(function(data) {
            var table = _.template($('#data_table').html(), {channel: data[0].channel});
            $('#show_data_table').append(table);
            var tpl = '';
            for (i in data) {
                var date = data[i].date;
                var users = data[i].users;
                tpl += _.template($('#data_row').html(), {date : date, users : users});
            };
            $('#data_table_body').append(tpl);
        };

        init();
    };
    return initData;
});