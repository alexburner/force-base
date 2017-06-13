var Util = {
    bound: function(val, range) {
        var low = range[0],
            high = range[1];
        return Math.max(low, Math.min(high, val));
    }
};

