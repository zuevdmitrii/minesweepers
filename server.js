module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/server.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/server.tsx":
/*!***************************!*\
  !*** ./server/server.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"react\"));\r\nvar server_1 = __importDefault(__webpack_require__(/*! react-dom/server */ \"react-dom/server\"));\r\nvar cookie_parser_1 = __importDefault(__webpack_require__(/*! cookie-parser */ \"cookie-parser\"));\r\nvar template_1 = __importDefault(__webpack_require__(/*! ./template */ \"./server/template.ts\"));\r\nvar Index_1 = __webpack_require__(/*! ../src/App/Index */ \"./src/App/Index.tsx\");\r\nvar app = express_1.default(), resourcesPath = path_1.default.join(\"\", \".\");\r\napp.use(cookie_parser_1.default());\r\nfunction renderApp(req, res) {\r\n    var context = {};\r\n    console.log(\"Render location \" + req.url);\r\n    var body = server_1.default.renderToString(react_1.default.createElement(Index_1.Index, null));\r\n    res.write(template_1.default({\r\n        body: body,\r\n        title: 'Minesweepers',\r\n        serialized: JSON.stringify({ serverData: \"I know that this isn't useful in current task, we could get some data on server side and move it to client\" }),\r\n    }));\r\n    res.end();\r\n}\r\napp.use(express_1.default.static(resourcesPath));\r\napp.get(\"/\", renderApp);\r\napp.get(\"/*\", renderApp);\r\nvar port = process.env.PORT || 777;\r\nvar expressServer = app.listen({ port: port }, function () {\r\n    return console.log(\"\\uD83D\\uDE80 Server ready\");\r\n});\r\n\n\n//# sourceURL=webpack:///./server/server.tsx?");

/***/ }),

/***/ "./server/template.ts":
/*!****************************!*\
  !*** ./server/template.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.default = (function (_a) {\r\n    var body = _a.body, title = _a.title, serialized = _a.serialized;\r\n    return \"\\n    <!DOCTYPE html>\\n    <html>\\n      <head>\\n        <meta charset=\\\"UTF-8\\\">\\n        <title>\" + title + \"</title>\\n        <meta name=\\\"viewport\\\" content=\\\"width=device-width\\\">\\n        <link rel=\\\"stylesheet\\\" href=\\\"/dist/index.css\\\" />\\n      </head>\\n    <body>\\n      <div id=\\\"main\\\">\" + body + \"</div>\\n      <script src=\\\"/node_modules/react/umd/react.development.js\\\"></script>\\n      <script src=\\\"/node_modules/react-dom/umd/react-dom.development.js\\\"></script>\\n      <script>\\n        window.__SERIALIZED_DATA = \" + serialized + \";\\n      </script>\\n      <script src=\\\"/dist/index.js\\\"></script>\\n    \\n    </body>\\n    </html>\\n  \";\r\n});\r\n\n\n//# sourceURL=webpack:///./server/template.ts?");

/***/ }),

/***/ "./src/App/Cell.less":
/*!***************************!*\
  !*** ./src/App/Cell.less ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./src/App/Cell.less?");

/***/ }),

/***/ "./src/App/Cell.tsx":
/*!**************************!*\
  !*** ./src/App/Cell.tsx ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.Cell = void 0;\r\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"react\"));\r\nvar Generator_1 = __webpack_require__(/*! ../Classes/Generator */ \"./src/Classes/Generator.ts\");\r\n__webpack_require__(/*! ./Cell.less */ \"./src/App/Cell.less\");\r\nvar getClassNameByData = function (data, isOver) {\r\n    if (!data) {\r\n        return \"cell__closed\";\r\n    }\r\n    if (data && data.state === Generator_1.CellStates.opened) {\r\n        if (data.value > 0) {\r\n            return \"cell__border\";\r\n        }\r\n        else if (data.value === 0) {\r\n            return \"cell__empty\";\r\n        }\r\n    }\r\n    if (data && data.state === Generator_1.CellStates.flagged) {\r\n        return \"cell__flag\";\r\n    }\r\n    if (data && data.state === Generator_1.CellStates.explosioned || data.value < 0 && isOver) {\r\n        return \"cell__expl\";\r\n    }\r\n    return \"cell__closed\";\r\n};\r\nexports.Cell = function (_a) {\r\n    var data = _a.data, attrs = _a.attrs, isOver = _a.isOver;\r\n    return (react_1.default.createElement(\"div\", __assign({}, attrs, { className: \"cell \" + getClassNameByData(data, isOver) }), data && data.state === Generator_1.CellStates.opened && data.value > 0\r\n        ? data.value\r\n        : \"\"));\r\n};\r\n\n\n//# sourceURL=webpack:///./src/App/Cell.tsx?");

/***/ }),

/***/ "./src/App/Game.less":
/*!***************************!*\
  !*** ./src/App/Game.less ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./src/App/Game.less?");

/***/ }),

/***/ "./src/App/Game.tsx":
/*!**************************!*\
  !*** ./src/App/Game.tsx ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.Game = void 0;\r\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"react\"));\r\nvar Generator_1 = __webpack_require__(/*! ../Classes/Generator */ \"./src/Classes/Generator.ts\");\r\nvar Button_1 = __webpack_require__(/*! ../Library/Button */ \"./src/Library/Button.tsx\");\r\nvar Cell_1 = __webpack_require__(/*! ./Cell */ \"./src/App/Cell.tsx\");\r\n__webpack_require__(/*! ./Game.less */ \"./src/App/Game.less\");\r\nvar useRenderAwait_1 = __webpack_require__(/*! ./useRenderAwait */ \"./src/App/useRenderAwait.ts\");\r\nvar useScrollEvent_1 = __webpack_require__(/*! ./useScrollEvent */ \"./src/App/useScrollEvent.tsx\");\r\nvar MAX_IN_GRID = 50;\r\nvar HIDDEN_ELEMENTS = 5;\r\nvar ELEMENT_SIZE = 20;\r\nexports.Game = function (props) {\r\n    var _a = react_1.useState(false), isStarted = _a[0], setIsStarted = _a[1];\r\n    var _b = react_1.useState(null), map = _b[0], setMap = _b[1];\r\n    var _c = react_1.useState(false), isOver = _c[0], setIsOver = _c[1];\r\n    var _d = react_1.useState(0), bombMarked = _d[0], setBombMarked = _d[1];\r\n    var _e = useScrollEvent_1.useScrollEvent(props.cols, props.rows, HIDDEN_ELEMENTS, ELEMENT_SIZE, MAX_IN_GRID), startPoint = _e.startPoint, onScroll = _e.onScroll;\r\n    var callback = useRenderAwait_1.useRenderAwait().callback;\r\n    var grid = react_1.useMemo(function () {\r\n        var array = [];\r\n        for (var i = 0; i < props.rows; i++) {\r\n            array[i] = [];\r\n            for (var j = 0; j < props.cols; j++) {\r\n                array[i][j] = j;\r\n            }\r\n        }\r\n        return array;\r\n    }, [props.cols, props.rows]);\r\n    var _f = react_1.useState(\"\"), message = _f[0], setMessage = _f[1];\r\n    react_1.useEffect(function () {\r\n        if (props.bombs === bombMarked) {\r\n            var countRight_1 = 0;\r\n            map.forEach(function (row) {\r\n                row.forEach(function (cell) {\r\n                    if (cell && cell.value < 0 && cell.state === Generator_1.CellStates.flagged) {\r\n                        countRight_1++;\r\n                    }\r\n                });\r\n            });\r\n            if (countRight_1 === props.bombs) {\r\n                setMessage(\"You are win! Congrats!\");\r\n            }\r\n        }\r\n    }, [props.bombs, bombMarked]);\r\n    return (react_1.default.createElement(react_1.default.Fragment, null,\r\n        message && (react_1.default.createElement(\"div\", { className: \"msg-wrapper\" },\r\n            message,\r\n            \" \",\r\n            react_1.default.createElement(\"br\", null),\r\n            \" \",\r\n            react_1.default.createElement(Button_1.Button, { caption: \"Okay\", onClick: function () { return setMessage(\"\"); } }))),\r\n        react_1.default.createElement(\"div\", { key: \"isOver-\" + isOver, className: \"grid\", onClick: function (e) {\r\n                //@ts-ignore\r\n                var element = e.nativeEvent.toElement;\r\n                var iPos = +element.attributes.ipos.value;\r\n                var jPos = +element.attributes.jpos.value;\r\n                if (isStarted) {\r\n                    Generator_1.OpenCell(map, iPos, jPos, props.rows, props.cols, function () {\r\n                        setMessage(\"We are thinking, but browser isn't freezed\");\r\n                        return callback();\r\n                    }).then(function (res) {\r\n                        setMap(res.newMap);\r\n                        if (res.isOver) {\r\n                            setIsOver(true);\r\n                            setMessage(\"Game over!\");\r\n                        }\r\n                        else {\r\n                            setMessage(\"\");\r\n                        }\r\n                    });\r\n                }\r\n                else {\r\n                    setIsStarted(true);\r\n                    props.onStart();\r\n                    var generatedMap = Generator_1.Generator(props.rows, props.cols, props.bombs, iPos, jPos);\r\n                    Generator_1.OpenCell(generatedMap, iPos, jPos, props.rows, props.cols, function () {\r\n                        setMessage(\"We are thinking, but browser isn't freezed\");\r\n                        return callback();\r\n                    }).then(function (res) {\r\n                        setMap(res.newMap);\r\n                        setMessage(\"\");\r\n                    });\r\n                }\r\n            }, onContextMenu: function (e) {\r\n                e.preventDefault();\r\n                //@ts-ignore\r\n                var element = e.nativeEvent.toElement;\r\n                var iPos = +element.attributes.ipos.value;\r\n                var jPos = +element.attributes.jpos.value;\r\n                if (map && props.bombs > bombMarked) {\r\n                    setMap(map.map(function (row, i) {\r\n                        return row.map(function (cell, j) {\r\n                            if (i === iPos && j === jPos) {\r\n                                var newCell = cell\r\n                                    ? __assign({}, cell) : { value: 0, state: Generator_1.CellStates.closed };\r\n                                if (newCell.state === Generator_1.CellStates.flagged) {\r\n                                    newCell.state = Generator_1.CellStates.closed;\r\n                                    setBombMarked(bombMarked - 1);\r\n                                }\r\n                                else if (newCell.state === Generator_1.CellStates.closed) {\r\n                                    newCell.state = Generator_1.CellStates.flagged;\r\n                                    setBombMarked(bombMarked + 1);\r\n                                }\r\n                                return newCell;\r\n                            }\r\n                            return cell;\r\n                        });\r\n                    }));\r\n                }\r\n            }, onScroll: onScroll },\r\n            startPoint.y > HIDDEN_ELEMENTS ? (react_1.default.createElement(\"div\", { style: {\r\n                    height: (startPoint.y - HIDDEN_ELEMENTS) * ELEMENT_SIZE + \"px\",\r\n                } })) : null,\r\n            grid.map(function (row, index) {\r\n                if (index <\r\n                    startPoint.y -\r\n                        HIDDEN_ELEMENTS -\r\n                        (startPoint.y + MAX_IN_GRID + HIDDEN_ELEMENTS > props.rows\r\n                            ? startPoint.y + MAX_IN_GRID + HIDDEN_ELEMENTS - props.rows\r\n                            : 0) ||\r\n                    index >\r\n                        startPoint.y +\r\n                            MAX_IN_GRID +\r\n                            HIDDEN_ELEMENTS +\r\n                            (startPoint.y < HIDDEN_ELEMENTS\r\n                                ? HIDDEN_ELEMENTS - startPoint.y\r\n                                : 0)) {\r\n                    return null;\r\n                }\r\n                return (react_1.default.createElement(\"div\", { className: \"grid__row \" + index, key: index },\r\n                    startPoint.x > HIDDEN_ELEMENTS ? (react_1.default.createElement(\"div\", { style: {\r\n                            width: (startPoint.x - HIDDEN_ELEMENTS) * ELEMENT_SIZE + \"px\",\r\n                        } })) : null,\r\n                    row.map(function (cell, indexCell) {\r\n                        var customAttr = { ipos: \"\" + index, jpos: \"\" + indexCell };\r\n                        if (indexCell <\r\n                            startPoint.x -\r\n                                HIDDEN_ELEMENTS -\r\n                                (startPoint.x + MAX_IN_GRID + HIDDEN_ELEMENTS > props.cols\r\n                                    ? startPoint.x +\r\n                                        MAX_IN_GRID +\r\n                                        HIDDEN_ELEMENTS -\r\n                                        props.cols\r\n                                    : 0) ||\r\n                            indexCell >\r\n                                startPoint.x +\r\n                                    MAX_IN_GRID +\r\n                                    HIDDEN_ELEMENTS +\r\n                                    (startPoint.x < HIDDEN_ELEMENTS\r\n                                        ? HIDDEN_ELEMENTS - startPoint.x\r\n                                        : 0)) {\r\n                            return null;\r\n                        }\r\n                        return (react_1.default.createElement(\"div\", __assign({ className: \"grid__cell\", key: indexCell }, customAttr),\r\n                            react_1.default.createElement(Cell_1.Cell, { attrs: customAttr, data: map ? map[index][indexCell] : null, isOver: isOver })));\r\n                    }),\r\n                    startPoint.x + MAX_IN_GRID + HIDDEN_ELEMENTS < props.cols ? (react_1.default.createElement(\"div\", { style: {\r\n                            width: (props.cols - (startPoint.x + MAX_IN_GRID + HIDDEN_ELEMENTS)) * ELEMENT_SIZE + \"px\",\r\n                        } })) : null));\r\n            }))));\r\n};\r\n\n\n//# sourceURL=webpack:///./src/App/Game.tsx?");

/***/ }),

/***/ "./src/App/Index.less":
/*!****************************!*\
  !*** ./src/App/Index.less ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./src/App/Index.less?");

/***/ }),

/***/ "./src/App/Index.tsx":
/*!***************************!*\
  !*** ./src/App/Index.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.Index = void 0;\r\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"react\"));\r\nvar Button_1 = __webpack_require__(/*! ../Library/Button */ \"./src/Library/Button.tsx\");\r\nvar Input_1 = __webpack_require__(/*! ../Library/Input */ \"./src/Library/Input.tsx\");\r\nvar Game_1 = __webpack_require__(/*! ./Game */ \"./src/App/Game.tsx\");\r\n__webpack_require__(/*! ./Index.less */ \"./src/App/Index.less\");\r\nexports.Index = function () {\r\n    var _a = react_1.useState(\"100\"), rows = _a[0], setRows = _a[1];\r\n    var _b = react_1.useState(\"100\"), cols = _b[0], setCols = _b[1];\r\n    var _c = react_1.useState(\"1\"), bombs = _c[0], setBombs = _c[1];\r\n    var _d = react_1.useState(false), isStarted = _d[0], setIsStarted = _d[1];\r\n    var _e = react_1.useState(0), keyGame = _e[0], setKeyGame = _e[1];\r\n    return (react_1.default.createElement(\"div\", { className: \"app__container\" },\r\n        react_1.default.createElement(\"div\", { className: \"app__control-panel\" },\r\n            react_1.default.createElement(\"div\", { className: \"control-panel__column\" },\r\n                react_1.default.createElement(Input_1.Input, { value: rows, onChange: setRows, caption: \"Rows:\", disabled: isStarted }),\r\n                react_1.default.createElement(Input_1.Input, { value: cols, onChange: setCols, caption: \"Cols:\", disabled: isStarted })),\r\n            react_1.default.createElement(\"div\", { className: \"control-panel__column\" },\r\n                react_1.default.createElement(Input_1.Input, { value: bombs, onChange: setBombs, caption: \"Bombs:\", disabled: isStarted }),\r\n                react_1.default.createElement(\"br\", null),\r\n                isStarted && react_1.default.createElement(Button_1.Button, { onClick: function () {\r\n                        setIsStarted(false);\r\n                        setKeyGame(keyGame + 1);\r\n                    }, caption: 'New Game' }))),\r\n        react_1.default.createElement(\"div\", { className: \"app__game-area\" },\r\n            react_1.default.createElement(Game_1.Game, { key: keyGame, rows: +rows, cols: +cols, bombs: +bombs, onStart: function () {\r\n                    setIsStarted(true);\r\n                }, onStop: function () { } }))));\r\n};\r\n\n\n//# sourceURL=webpack:///./src/App/Index.tsx?");

/***/ }),

/***/ "./src/App/useRenderAwait.ts":
/*!***********************************!*\
  !*** ./src/App/useRenderAwait.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.useRenderAwait = void 0;\r\nvar react_1 = __webpack_require__(/*! react */ \"react\");\r\nexports.useRenderAwait = function () {\r\n    var foreverAlive = react_1.useState({\r\n        resolver: undefined,\r\n    })[0];\r\n    var _a = react_1.useState(0), render = _a[0], setRender = _a[1];\r\n    react_1.useEffect(function () {\r\n        setTimeout(function () {\r\n            if (foreverAlive.resolver) {\r\n                foreverAlive.resolver();\r\n            }\r\n        }, 0);\r\n    }, [render]);\r\n    var callback = function () {\r\n        var awaiter = new Promise(function (resolve) {\r\n            foreverAlive.resolver = resolve;\r\n        });\r\n        setRender(function (render) { return render + 1; });\r\n        return awaiter;\r\n    };\r\n    return { callback: callback };\r\n};\r\n\n\n//# sourceURL=webpack:///./src/App/useRenderAwait.ts?");

/***/ }),

/***/ "./src/App/useScrollEvent.tsx":
/*!************************************!*\
  !*** ./src/App/useScrollEvent.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.useScrollEvent = void 0;\r\nvar react_1 = __webpack_require__(/*! react */ \"react\");\r\nexports.useScrollEvent = function (cols, rows, HIDDEN_ELEMENTS, ELEMENT_SIZE, MAX_IN_GRID) {\r\n    var _a = react_1.useState({\r\n        x: 0,\r\n        y: 0,\r\n        xPrev: 0,\r\n        yPrev: 0,\r\n        yPrevAction: 0,\r\n    }), startPoint = _a[0], setStartPoint = _a[1];\r\n    return {\r\n        startPoint: startPoint,\r\n        onScroll: function (e) {\r\n            e.preventDefault();\r\n            //@ts-ignore\r\n            var scrollLeft = e.target.scrollLeft;\r\n            //@ts-ignore\r\n            var scrollTop = e.target.scrollTop;\r\n            //@ts-ignore\r\n            var width = e.target.offsetWidth;\r\n            //@ts-ignore\r\n            var scrollWidth = e.target.scrollWidth;\r\n            //@ts-ignore\r\n            var height = e.target.offsetHeight;\r\n            //@ts-ignore\r\n            var scrollHeight = e.target.scrollHeight;\r\n            var newStartPoint = __assign({}, startPoint);\r\n            /*newStartPoint.xPrev = scrollLeft;\r\n            if (\r\n              scrollLeft + width > scrollWidth - 20 &&\r\n              startPoint.x < cols - HIDDEN_ELEMENTS\r\n            ) {\r\n              newStartPoint.x = cols - HIDDEN_ELEMENTS;\r\n            }\r\n      \r\n            if (scrollLeft < 20 && startPoint.x > 0) {\r\n              newStartPoint.x = 0;\r\n            }\r\n      \r\n            if (\r\n              scrollLeft > startPoint.xPrev &&\r\n              startPoint.x < cols - HIDDEN_ELEMENTS\r\n            ) {\r\n              newStartPoint.x+=1;\r\n            }\r\n      \r\n            if (scrollLeft < startPoint.xPrev && startPoint.x > 0) {\r\n              newStartPoint.x-=1;\r\n            }*/\r\n            var tempX = Math.round((scrollLeft - HIDDEN_ELEMENTS * ELEMENT_SIZE) / ELEMENT_SIZE);\r\n            if (tempX > cols - MAX_IN_GRID - HIDDEN_ELEMENTS) {\r\n                tempX = cols - MAX_IN_GRID - HIDDEN_ELEMENTS;\r\n            }\r\n            newStartPoint.x = tempX > 0 ? tempX : 0;\r\n            var temp = Math.round((scrollTop - HIDDEN_ELEMENTS * ELEMENT_SIZE) / ELEMENT_SIZE);\r\n            if (temp > rows - MAX_IN_GRID - HIDDEN_ELEMENTS) {\r\n                temp = rows - MAX_IN_GRID - HIDDEN_ELEMENTS;\r\n            }\r\n            newStartPoint.y = temp > 0 ? temp : 0;\r\n            setStartPoint(newStartPoint);\r\n        },\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack:///./src/App/useScrollEvent.tsx?");

/***/ }),

/***/ "./src/Classes/Generator.ts":
/*!**********************************!*\
  !*** ./src/Classes/Generator.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.OpenCell = exports.Generator = exports.IncrementNeighbor = exports.GetPlusOneOrBomb = exports.CellStates = void 0;\r\nvar CellStates;\r\n(function (CellStates) {\r\n    CellStates[\"closed\"] = \"closed\";\r\n    CellStates[\"opened\"] = \"opened\";\r\n    CellStates[\"flagged\"] = \"flagged\";\r\n    CellStates[\"explosioned\"] = \"explosioned\";\r\n})(CellStates = exports.CellStates || (exports.CellStates = {}));\r\nexports.GetPlusOneOrBomb = function (cell) {\r\n    if (!cell) {\r\n        return { value: 1, state: CellStates.closed };\r\n    }\r\n    if (cell.value === -1) {\r\n        return cell;\r\n    }\r\n    return __assign(__assign({}, cell), { value: cell.value + 1 });\r\n};\r\nvar WalkByNeighbor = function (map, i, j, rows, cols, callback) {\r\n    if (i > 0) {\r\n        map[i - 1][j] = callback(map[i - 1][j], i - 1, j);\r\n        if (j > 0) {\r\n            map[i - 1][j - 1] = callback(map[i - 1][j - 1], i - 1, j - 1);\r\n        }\r\n        if (j < cols - 1) {\r\n            map[i - 1][j + 1] = callback(map[i - 1][j + 1], i - 1, j + 1);\r\n        }\r\n    }\r\n    if (j > 0) {\r\n        map[i][j - 1] = callback(map[i][j - 1], i, j - 1);\r\n    }\r\n    if (j < cols - 1) {\r\n        map[i][j + 1] = callback(map[i][j + 1], i, j + 1);\r\n    }\r\n    if (i < rows - 1) {\r\n        map[i + 1][j] = callback(map[i + 1][j], i + 1, j);\r\n        if (j > 0) {\r\n            map[i + 1][j - 1] = callback(map[i + 1][j - 1], i + 1, j - 1);\r\n        }\r\n        if (j < cols - 1) {\r\n            map[i + 1][j + 1] = callback(map[i + 1][j + 1], i + 1, j + 1);\r\n        }\r\n    }\r\n};\r\nexports.IncrementNeighbor = function (map, i, j, rows, cols) {\r\n    WalkByNeighbor(map, i, j, rows, cols, exports.GetPlusOneOrBomb);\r\n};\r\nexports.Generator = function (rows, cols, bombs, blockI, blockJ) {\r\n    var countCells = rows * cols - 1;\r\n    var bombLeft = bombs;\r\n    var map = [[]];\r\n    for (var i = 0; i < rows; i++) {\r\n        if (i < rows - 1) {\r\n            map[i + 1] = [];\r\n        }\r\n        for (var j = 0; j < cols; j++) {\r\n            if (i !== blockI || j !== blockJ) {\r\n                var variaty = bombLeft / countCells;\r\n                var isBomb = variaty > 0.9 || variaty > Math.random();\r\n                if (isBomb) {\r\n                    bombLeft--;\r\n                    map[i][j] = { value: -1, state: CellStates.closed };\r\n                    exports.IncrementNeighbor(map, i, j, rows, cols);\r\n                }\r\n            }\r\n            countCells--;\r\n        }\r\n    }\r\n    return map;\r\n};\r\nvar ChangeStatus = function (newMap, i, j, rows, cols) {\r\n    var cell = newMap[i][j];\r\n    var isOver = false;\r\n    if (cell && cell.state === CellStates.opened) {\r\n        return;\r\n    }\r\n    var queue = [];\r\n    if (!cell) {\r\n        newMap[i][j] = { value: 0, state: CellStates.opened };\r\n        WalkByNeighbor(newMap, i, j, rows, cols, function (cell, newI, newJ) {\r\n            if (!cell || cell.state !== CellStates.opened && cell.state !== CellStates.flagged) {\r\n                queue.push({ i: newI, j: newJ });\r\n            }\r\n            return cell;\r\n        });\r\n    }\r\n    else if (cell.value === 0) {\r\n        newMap[i][j] = __assign(__assign({}, newMap[i][j]), { state: CellStates.opened });\r\n        WalkByNeighbor(newMap, i, j, rows, cols, function (cell, newI, newJ) {\r\n            if (!cell || cell.state !== CellStates.opened && cell.state !== CellStates.flagged) {\r\n                queue.push({ i: newI, j: newJ });\r\n            }\r\n            return cell;\r\n        });\r\n    }\r\n    else if (cell.value > 0) {\r\n        newMap[i][j] = __assign(__assign({}, newMap[i][j]), { state: CellStates.opened });\r\n    }\r\n    else {\r\n        newMap[i][j] = __assign(__assign({}, newMap[i][j]), { state: CellStates.explosioned });\r\n        isOver = true;\r\n    }\r\n    return { queue: queue, isOver: isOver };\r\n};\r\nexports.OpenCell = function (map, i, j, rows, cols, renderCallback) { return __awaiter(void 0, void 0, void 0, function () {\r\n    var isOver, cell, newMap, globalQueue, globalUnique, timeStamp, qNum, result, long;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                isOver = false;\r\n                cell = map[i][j];\r\n                if (cell && cell.state === CellStates.opened) {\r\n                    return [2 /*return*/, { isOver: isOver, newMap: map }];\r\n                }\r\n                newMap = map.map(function (row) {\r\n                    return row.map(function (col) {\r\n                        return __assign({}, col);\r\n                    });\r\n                });\r\n                globalQueue = [{ i: i, j: j }];\r\n                globalUnique = {};\r\n                timeStamp = Date.now();\r\n                qNum = 0;\r\n                _a.label = 1;\r\n            case 1:\r\n                if (!(qNum < globalQueue.length)) return [3 /*break*/, 4];\r\n                result = ChangeStatus(newMap, globalQueue[qNum].i, globalQueue[qNum].j, rows, cols);\r\n                isOver = isOver || result.isOver;\r\n                result.queue.forEach(function (q) {\r\n                    if (!globalUnique[q.i + \"-\" + q.j]) {\r\n                        globalUnique[q.i + \"-\" + q.j] = true;\r\n                        globalQueue.push(q);\r\n                    }\r\n                });\r\n                long = Date.now() - timeStamp;\r\n                if (!(long > 50)) return [3 /*break*/, 3];\r\n                return [4 /*yield*/, renderCallback(newMap)];\r\n            case 2:\r\n                _a.sent();\r\n                timeStamp = Date.now();\r\n                _a.label = 3;\r\n            case 3:\r\n                qNum++;\r\n                return [3 /*break*/, 1];\r\n            case 4: return [2 /*return*/, { isOver: isOver, newMap: newMap }];\r\n        }\r\n    });\r\n}); };\r\n\n\n//# sourceURL=webpack:///./src/Classes/Generator.ts?");

/***/ }),

/***/ "./src/Library/Button.less":
/*!*********************************!*\
  !*** ./src/Library/Button.less ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./src/Library/Button.less?");

/***/ }),

/***/ "./src/Library/Button.tsx":
/*!********************************!*\
  !*** ./src/Library/Button.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.Button = void 0;\r\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"react\"));\r\n__webpack_require__(/*! ./Button.less */ \"./src/Library/Button.less\");\r\nexports.Button = function (props) {\r\n    return react_1.default.createElement(\"button\", { className: \"button\", onClick: props.onClick }, props.caption);\r\n};\r\n\n\n//# sourceURL=webpack:///./src/Library/Button.tsx?");

/***/ }),

/***/ "./src/Library/Input.less":
/*!********************************!*\
  !*** ./src/Library/Input.less ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./src/Library/Input.less?");

/***/ }),

/***/ "./src/Library/Input.tsx":
/*!*******************************!*\
  !*** ./src/Library/Input.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.Input = void 0;\r\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"react\"));\r\n__webpack_require__(/*! ./Input.less */ \"./src/Library/Input.less\");\r\nexports.Input = function (props) {\r\n    return (react_1.default.createElement(\"div\", { className: \"input\" },\r\n        react_1.default.createElement(\"div\", null, props.caption),\r\n        react_1.default.createElement(\"input\", { className: \"input__text\", disabled: props.disabled, type: \"text\", value: props.value, onChange: function (e) {\r\n                props.onChange(e.target.value);\r\n            } })));\r\n};\r\n\n\n//# sourceURL=webpack:///./src/Library/Input.tsx?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ })

/******/ });