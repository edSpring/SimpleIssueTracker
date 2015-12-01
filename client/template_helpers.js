var DateFormats = {
    "short": "MMM DD, YYYY",
    "shortdt": "MMM, DD @ h:mm a",
    "medium": "dddd DD.MM.YYYY HH:mm",
    "long": "dddd, MMMM DD @ h:mm a",
    "abbr": "ddd, MMM D, YYYY",
    "datepicker": "MM/DD/YYYY",
    "military": "HH:mm"
};

Template.registerHelper("formatDate", function (datetime, format, showDefaultText) {
    var d = new Date(datetime)
        , _dateString
        , format = format || "long";

    showDefaultText = _.isBoolean(showDefaultText) ? showDefaultText : false;
    
    if (!datetime) {
        return showDefaultText && "Not specified" || "";
    }
    
    if (Package["momentjs:moment"]) {
        if (format === "relative") {
            _dateString = moment(d).fromNow();
        } else {
            var f = DateFormats[format] || format;
            _dateString = moment(d).format(f);
        }
    } else {
        // return basic mm/dd/yyyy format if momentjs not found
        _dateString = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
    }
    return _dateString;
});

Template.registerHelper("pluralize", function(n, thing, plural) {
    // fairly stupid pluralizer
    var n = parseInt(n) || 0
        , result = n + " " + thing;
    
    plural = _.isString(plural) ? plural : void(0);

    if (n !== 1) {
        if (plural) {
            result = n + " " + plural;
        } else {
            result += "s";
        }
    }
    return result;
});