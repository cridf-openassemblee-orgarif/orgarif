export SDKMAN_DIR="/Users/mlo/.sdkman"
[[ -s "/Users/mlo/.sdkman/bin/sdkman-init.sh" ]] && source "/Users/mlo/.sdkman/bin/sdkman-init.sh"
sdk use java 8.0.232.hs-adpt
cd ~/temp/openassemblee/ # so elastic search create its index there
java -jar target/openassemblee-1.0-SNAPSHOT.war