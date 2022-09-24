The `english_large.txt` dictionary, is taken from a dictionary provided by MIT.
Available on [mit.edu](https://www.mit.edu/~ecprice/wordlist.10000).

Initial testing showed that this dictionary took `4.3729ms` to be read from disk, and took `9.5119ms` to be put into a HashTable in AssemblyScript. Which is a total of `13.8899ms` to load the dictionary. Resulting in a lookup for a word taking `0.5133ms`.

The above HashTable and Dictionary taking up `~5.19MB` of space in memory.
