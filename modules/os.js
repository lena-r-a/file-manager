import os from 'os'

export const getOSdata = async(command) => {
  const commandData = command.substring(5);

  if (commandData == 'EOL') console.log(JSON.stringify(os.EOL))
  if (commandData == 'cpus') {
    const models = os.cpus();
    console.log(`Amount os CPUS = ${models.length}`);
    models.forEach((item) => console.log(item.model));
  }
  if (commandData == 'homedir') console.log(os.homedir())
  if (commandData == 'username') console.log(os.userInfo().username)
  if (commandData == 'architecture') console.log(os.arch())

}