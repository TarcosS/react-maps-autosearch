var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useEffect, useRef, useState } from "react";
import { MapContainer } from "react-leaflet";
import { motion } from "framer-motion";
import OSM from "./components/OSM";
import UilMapMarker from "./assets/svg/Marker";
import { OPEN_STREET_MAP_PROVIDER } from "./providers";
import "leaflet/dist/leaflet.css";
import "./assets/index.css";
import { OPEN_STREET_MAP_SEARCHER } from "./searchers";
import useDebounce from "./hooks/useDebounce";
var listVariants = {
    open: { opacity: 1, x: 0, zIndex: 100 },
    closed: { opacity: 0, y: "-10px", zIndex: -100 },
};
var MapSearchInput = function (_a) {
    var ApiKey = _a.ApiKey, _b = _a.placeholder, placeholder = _b === void 0 ? "Search..." : _b, onChange = _a.onChange, loader = _a.loader, _c = _a.searchSize, searchSize = _c === void 0 ? 10 : _c, className = _a.className, classNames = _a.classNames, style = _a.style, styles = _a.styles, _d = _a.enablePreview, enablePreview = _d === void 0 ? true : _d, _e = _a.enablePreviewRelative, enablePreviewRelative = _e === void 0 ? false : _e, _f = _a.provider, provider = _f === void 0 ? OPEN_STREET_MAP_PROVIDER : _f, _g = _a.searcher, searcher = _g === void 0 ? OPEN_STREET_MAP_SEARCHER : _g;
    var mapVariants = {
        open: { opacity: 1, x: 0, zIndex: 100 },
        closed: enablePreviewRelative
            ? { opacity: 0, y: "10px", zIndex: 0, height: 0, display: "none" }
            : { opacity: 0, y: "10px", zIndex: 0 },
    };
    var _h = useState(""), text = _h[0], setText = _h[1];
    var debouncedText = useDebounce(text, 300);
    var _j = useState([]), places = _j[0], setPlaces = _j[1];
    var _k = useState(null), selectedPlace = _k[0], setSelectedPlace = _k[1];
    var _l = useState(false), isPending = _l[0], setPending = _l[1];
    var _m = useState(false), isFocus = _m[0], setIsFocus = _m[1];
    var _o = useState(false), isHover = _o[0], setIsHover = _o[1];
    var inputRef = useRef(null);
    if (provider.needKey && !ApiKey) {
        throw new Error("API Key is required for this provider");
    }
    var updatePlaces = function (string) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setPending(true);
                    return [4 /*yield*/, searcher.search(string, searchSize, ApiKey)];
                case 1:
                    response = _a.sent();
                    setPlaces(response);
                    setPending(false);
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        if (onChange) {
            onChange(selectedPlace);
        }
    }, [selectedPlace, onChange]);
    useEffect(function () {
        if (debouncedText.length > 0) {
            updatePlaces(debouncedText);
        }
        else {
            setPlaces([]);
            setSelectedPlace(null);
        }
    }, [debouncedText]);
    return (React.createElement("div", { className: "map-search-wrapper " + className, style: style, onMouseLeave: function () {
            setIsHover(false);
        }, onMouseEnter: function () {
            setIsHover(true);
        } },
        enablePreview && (React.createElement(motion.div, { animate: enablePreviewRelative
                ? selectedPlace
                    ? "open"
                    : "closed"
                : isFocus || isHover
                    ? selectedPlace
                        ? "open"
                        : "closed"
                    : "closed", variants: mapVariants, className: "map-search-map " +
                (classNames === null || classNames === void 0 ? void 0 : classNames.mapWrapper) +
                (enablePreviewRelative ? " relative" : ""), style: styles === null || styles === void 0 ? void 0 : styles.mapWrapper },
            React.createElement(MapContainer, { center: [(selectedPlace === null || selectedPlace === void 0 ? void 0 : selectedPlace.lat) || 0, (selectedPlace === null || selectedPlace === void 0 ? void 0 : selectedPlace.lng) || 0], zoom: 3, scrollWheelZoom: false, zoomControl: false, style: {
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                } },
                React.createElement(OSM, { selectedPlace: selectedPlace, provider: provider })))),
        React.createElement("input", { ref: inputRef, onFocus: function () {
                setIsFocus(true);
            }, onBlur: function () {
                setIsFocus(false);
            }, type: "text", className: "map-search-input " + (classNames === null || classNames === void 0 ? void 0 : classNames.input), style: styles === null || styles === void 0 ? void 0 : styles.input, placeholder: placeholder, value: text, onChange: function (e) { return setText(e.target.value); } }),
        React.createElement(motion.div, { className: "map-search-list " + (classNames === null || classNames === void 0 ? void 0 : classNames.list), style: styles === null || styles === void 0 ? void 0 : styles.list, animate: isFocus ? (text.length > 0 ? "open" : "closed") : "closed", variants: listVariants },
            isPending &&
                (loader !== null && loader !== void 0 ? loader : React.createElement("div", { className: "map-search-list-item" }, "Loading...")),
            places.map(function (place, index) { return (React.createElement("div", { key: "place_".concat(index), className: "map-search-list-item " +
                    (classNames === null || classNames === void 0 ? void 0 : classNames.listItem) +
                    (selectedPlace === place
                        ? "active " + (classNames === null || classNames === void 0 ? void 0 : classNames.listItemActive)
                        : ""), style: styles === null || styles === void 0 ? void 0 : styles.listItem, onClick: function () {
                    var _a;
                    setSelectedPlace(selectedPlace === place ? null : place);
                    setText(place.name);
                    (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                } },
                React.createElement("div", { style: {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        gap: 4,
                    } },
                    React.createElement(UilMapMarker, { style: { flex: "none", position: "relative" }, width: 16 }),
                    React.createElement("div", { className: "map-search-list-item-title" }, place.name)),
                React.createElement("div", { className: "map-search-list-item-subtitle" }, place.formattedName))); }))));
};
export default MapSearchInput;
