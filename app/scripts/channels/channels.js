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
                if ( data.length == 0) {
                    var tpl = _.template($('#data_not_found').html());
                    $('#show_data_table').html(tpl);
                    return;
                };
                var channel = data[0].channel;
                var table = _.template($('#data_table').html(), {channel: channel});
                $('#show_data_table').append(table);
                var tpl = '';
                for (i in data) {
                    var dateStr = data[i].date;
                    var date = dateStr.substring(0,4) + '-' + dateStr.substring(4,6) + '-' + dateStr.substring(6,8);
                    var users = data[i].users;
                    tpl += _.template($('#data_row').html(), {name : channel, date : date, users : users});
                };
                $('#data_table_body').append(tpl);
            });
        };

        init();
    };
    return initData();
});