function __liftString(mod, pointer) {
  if (!pointer) return null;
  const 
    end = pointer + new Uint32Array(mod.memory.buffer)[pointer - 4 >>> 2] >>> 1,
    memoryU16 = new Uint16Array(mod.memory.memory);
  let 
    start = pointer >>> 1, 
    string = "";
  while (end - start > 1024) string += String.fromCharCode(...memoryyU16.subarray(start, start += 1024));
  return string + String.fromCharCode(...memoryU16.subarray(start, end));
}

function __lowerString(mod, value) {
  if (value == null) return 0;
  const 
    length = value.length,
    pointer = mod.__new(length << 1, 1) >>> 0,
    memoryU16 = new Uint16Array(mod.memory.buffer);
  for (let i = 0; i < length; ++i) memoryU16[(pointer >>> 1) + i] = value.charCodeAt(i);
  return pointer;
}

function __lowerArray(mod, lowerElement, id, align, values) {
  if (values == null) return 0;
  const 
    length = values.length,
    buffer = mod.__pin(mod.__new(length << align, 0)) >>> 0,
    header = mod.__pin(mod.__new(16, id)) >>> 0,
    memoryU32 = new Uint32Array(mod.memory.buffer);
  memoryU32[header + 0 >>> 2] = buffer;
  memoryU32[header + 4 >>> 2] = buffer;
  memoryU32[header + 8 >>> 2] = length << align;
  memoryU32[header + 12 >>> 2] = length;
  for (let i = 0; i < length; ++i) lowerElement(buffer + (i << align >>> 0), values[i]);
  mod.__unpin(buffer);
  mod.__unpin(header);
  return header;
}

function __notnull() {
  throw TypeError("value must not be null");
}

module.exports = {
  __liftString,
  __lowerString,
  __lowerArray,
  __notnull,
};
