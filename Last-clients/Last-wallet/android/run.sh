#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n io.lastofours.wallet/host.exp.exponent.MainActivity
