#!/bin/bash

FOLLY_HEADER="node_modules/react-native/ReactCommon/hermes/executor/HermesExecutorFactory.cpp"

if grep -q '#include <string>' "$FOLLY_HEADER"; then
  echo "Patch déjà appliqué."
else
  echo -e "\n// Patch char_traits<unsigned char>" >> "$FOLLY_HEADER"
  echo "#include <string>" >> "$FOLLY_HEADER"
  echo "#include <string_view>" >> "$FOLLY_HEADER"
  echo "Patch appliqué à HermesExecutorFactory.cpp"
fi