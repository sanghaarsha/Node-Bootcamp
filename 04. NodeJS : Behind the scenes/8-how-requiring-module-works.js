// ES modules (i.e. import/export) only work on browsers
// NodeJS uses CommonJS module system : require(), exports or module.exports

// How does require('module-name') works?
//  STEP 1 : Resolve module path, load the file
//  STEP 2 : Wrapping
//  STEP 3 : Execution
//  STEP 4 : Returning Exports
//  STEP 5 : Caching

//  STEP 1 : Resolve module path, load the file
// > Start with core modules
// > if begins with './' or '../' , try load developer module
// > if no file found Try find a folder with index.js in it
// > Else go to node_modules/ and try to find modules there

//  STEP 2 : Wrapping
// > Module code is wrapped into a special function, which will give us access to couple of special objects

// > like this :
// (function(exports,require,module,__filename,__dirname) {
//     // MODULE CODE HERE
// })

// > wrapping provides us with some useful objects and scoping of our variables locally, preventing from leaking it globally

//  STEP 3 : Execution
// > code in wrapper function gets executed by NodeJS runtime

//  STEP 4 : Returning Exports
// > require function returns exports of the required module
// > 'module.exports' is the returned object (imp!)
// > use module.exports to export one single variable
// > use 'exports' to export multiple named variables

//  STEP 5 : Caching
// > modules imported are cached
