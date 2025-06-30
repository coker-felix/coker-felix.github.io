---
title: "SimKV: A Simple Log-Structured Hash Table Key-Value Store"
publishedAt: 2025-06-29
description: "An introduction to building a simple, immutable key-value store using Log-Structured Hash Table architecture. Learn the core concepts behind modern database systems like LevelDB and RocksDB."
isPublish: true
isDraft: false
---

# SimKV: A Simple Log-Structured Hash Table Key-Value Store

## Introduction

SimKV is a simple, immutable key-value store implementation based on Log-Structured Hash Table (LSHT) architecture. This project demonstrates the core concepts behind modern database systems like LevelDB, RocksDB, and Cassandra, providing a hands-on learning experience for understanding how these powerful, complex systems work under the hood.

## What is a Log-Structured Hash Table?

A Log-Structured Hash Table (LSHT) is a storage architecture that combines the benefits of log-structured storage with hash-based indexing for fast lookups. Here's how it works:

### Core Principles

1. **Append-Only Log**: All writes are appended to the end of a log file, making writes extremely fast (no random seeks)
2. **In-Memory Index**: A hash table in memory maps keys to their positions in the log file
3. **Immutable Records**: Once written, records are never modified in place - updates create new versions
4. **Tombstone Markers**: Deletions are marked with special "tombstone" flags rather than removing data

### Why This Architecture?

- **Write Performance**: Appending to a log is much faster than random writes
- **Crash Recovery**: The log structure makes recovery simpler and more reliable
- **Concurrency**: Multiple readers can access data while writes happen
- **Compaction**: Old versions can be cleaned up later through compaction processes

## Record Structure

Each record in SimKV follows a binary format optimized for fast serialization and deserialization:

```
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│ Timestamp   │ Key Length  │ Value Length│ Tombstone   │ Key Data    │ Value Data  │
│ (4 bytes)   │ (4 bytes)   │ (4 bytes)   │ (1 byte)    │ (variable)  │ (variable)  │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

### Field Descriptions

- **Timestamp**: Unix timestamp when the record was created (4 bytes)
- **Key Length**: Length of the key in bytes (4 bytes)
- **Value Length**: Length of the value in bytes (4 bytes)
- **Tombstone Flag**: Boolean flag indicating if the record is deleted (1 byte)
- **Key Data**: The actual key bytes (variable length)
- **Value Data**: The actual value bytes (variable length)

### Why Variable Lengths?

Since we don't know the size of keys and values in advance, we store their lengths in the header. This allows us to:

1. **Skip Records**: When iterating, we can calculate the next record's position
2. **Validate Data**: Ensure we read the correct amount of data
3. **Handle Different Sizes**: Support keys and values of any reasonable size

## Architecture Overview

SimKV consists of several key components:

### Storage Engine
The core storage engine manages:
- **File I/O**: Reading and writing to the log file
- **Index Management**: Maintaining the in-memory hash table
- **Concurrency Control**: Thread-safe operations using mutexes
- **Record Serialization**: Converting records to/from binary format

### Query Layer
Handles user operations:
- **Put**: Store a key-value pair
- **Get**: Retrieve a value by key
- **Delete**: Mark a key as deleted (tombstone)
- **Iterator**: Scan through all records

### Index Structure
An in-memory hash table maps string keys to file offsets:
```go
type RecordStore struct {
    mu    sync.RWMutex
    File  *os.File
    index map[string]int64  // key -> file offset
}
```

## Key Features

### 1. Thread-Safe Operations
All operations are protected by mutexes to ensure thread safety:
```go
func (s *RecordStore) Put(key, value []byte) error {
    s.mu.Lock()
    defer s.mu.Unlock()
    // ... implementation
}
```

### 2. Crash Recovery
On startup, the index is rebuilt by scanning the log file:
```go
func (s *RecordStore) buildIndex() error {
    var offset int64
    for {
        record, err := s.readData(offset)
        if err == io.EOF {
            break
        }
        // Rebuild index from log
    }
}
```

### 3. Tombstone Support
Deletions are handled by writing tombstone markers:
```go
func (s *RecordStore) Delete(key []byte) error {
    record := &Record{
        Key:       key,
        Tombstone: true,  // Mark as deleted
        Timestamp: uint32(time.Now().Unix()),
    }
    // Write tombstone to log
}
```

## Usage Examples

### Basic Operations
```go
// Create a new store
store, err := NewRecordStore()
if err != nil {
    log.Fatal(err)
}
defer store.Close()

// Store data
err = store.Put([]byte("name"), []byte("Felix"))
err = store.Put([]byte("age"), []byte("16"))

// Retrieve data
value, err := store.Get([]byte("name"))
fmt.Println(string(value)) // Output: Felix

// Delete data
err = store.Delete([]byte("age"))

// Iterate through all records
iter, err := store.Iterator()
for iter.Next() {
    record, err := iter.Record()
    fmt.Printf("Key: %s, Value: %s\n", string(record.Key), string(record.Value))
}
```

## Building and Running

### Prerequisites
- Go 1.19 or later

### Build the Project
```bash
# Clone the repository (if applicable)
git clone <repository-url>
cd simkv

# Build the executable
go build -o simkv .

# Or build for specific platforms
GOOS=linux GOARCH=amd64 go build -o simkv-linux .
GOOS=darwin GOARCH=amd64 go build -o simkv-mac .
```

### Run the Project
```bash
# Run the example program
./simkv

# Expected output:
# Felix
# Key: age, Value: 16
```

### Development
```bash
# Run tests (if available)
go test ./...

# Run with race detection
go run -race .

# Format code
go fmt ./...

# Check for issues
go vet ./...
```

## File Organization

```
simkv/
├── main.go          # Example usage and entry point
├── store.go         # Core storage engine implementation
├── scan_store.go    # Iterator implementation
├── go.mod           # Go module definition
└── README.md        # This file
```

## Future Enhancements

The current implementation is a foundation that can be extended with:

1. **Compaction**: Remove old versions and tombstones to reclaim space
2. **Multiple Log Files**: Support for multiple log files (SSTables)
3. **Bloom Filters**: Fast non-existence checks
4. **Compression**: Reduce storage requirements
5. **Transactions**: ACID guarantees
6. **Persistence**: Better crash recovery mechanisms

## Learning Value

This project demonstrates several important database concepts:

- **Binary Serialization**: Efficient data encoding
- **File Organization**: Structured storage on disk
- **Indexing Strategies**: Fast lookup mechanisms
- **Concurrency Control**: Thread-safe operations
- **Crash Recovery**: Rebuilding state from persistent storage

## References

For deeper understanding of key-value store internals and database design:

- **[TiKV Deep Dive: Key-Value Engine](https://tikv.org/deep-dive/key-value-engine/introduction/)** - Comprehensive guide to key-value engine architecture from the TiKV project
- **[How Databases Work Under the Hood: Building a Key-Value Store in Go](https://medium.com/@mgalalen/how-databases-work-under-the-hood-building-a-key-value-store-in-go-2af9a772c10d)** - Practical tutorial on building key-value stores with Go

## Conclusion

SimKV provides a hands-on introduction to the internals of modern key-value stores. While simple, it demonstrates the core principles that power systems like LevelDB, RocksDB, and Cassandra. The append-only log structure, in-memory indexing, and immutable records are fundamental concepts in modern database design.

By understanding these concepts through implementation, you'll have a solid foundation for working with and contributing to more complex database systems.

---

*Note: This is a learning project. For production use, consider established solutions like LevelDB, RocksDB, or BadgerDB.*