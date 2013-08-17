// Copyright 2013 Timothy J Fontaine <tjfontaine@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

#include "node.h"

#include "node.h"
#include "node_version.h"
#include "v8.h"

using v8::Handle;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::V8;

#if NODE_VERSION_AT_LEAST(0, 11, 3)
using v8::FunctionCallbackInfo;
#else
using v8::Arguments;
using v8::Undefined;
#endif

#if NODE_VERSION_AT_LEAST(0, 11, 3)
void
SetFlags(const FunctionCallbackInfo<Value>& args)
#else
Handle<Value>
SetFlags(const Arguments& args)
#endif
{
  String::Utf8Value str(args[0]);
  char* s = *str;
  uint32_t l = str.length();
  V8::SetFlagsFromString(s, l);

#if !NODE_VERSION_AT_LEAST(0, 11, 3)
  return Undefined();
#endif
}

void
init(Local<Object> module)
{
  NODE_SET_METHOD(module, "setFlags", SetFlags);
}

NODE_MODULE(setflags, init)
