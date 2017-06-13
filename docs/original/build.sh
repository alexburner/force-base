#!/bin/bash

files=(
./src/Util.js
./src/Options.js
./src/FakeData.js
./src/Layers.js
./src/Geometry.js
./src/Materials.js
./src/Animations.js
./src/Controls.js
./src/Events.js
./src/Menu.js
./src/MeshObject.js
./src/Node.js
./src/Edge.js
./src/DeviceNode.js
./src/Graph.js
./src/Renderer.js
./src/ActivityMap.js
)

cat ${files[@]} > dist/activitymap.js

