// READABLE STREAMS : http requests, fs read streams,
// [events : data,end]
// [functions : pipe(), read()]

// WRITEABLE STREAMS : http responses, fs write streams
// [events : drain,finish]
// [functions : write(), end()]

// DUPLEX STREAMS : {both writeable and readable at the same time}
// eg : websocket from net module

// TRANSFORM STREAMS : {duplex stream which can mutate(change/perform a calculation on) data as it is being read/write}
// eg : zlib Gzip creation
