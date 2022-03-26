function isValidMailContent(type, content) {
  switch (type) {
    case 1: //ACCOUNT ACTIVATION EMAIL
      return !this.isEmpty(content.activation_link);
    default:
      return false;
  }
}

module.exports = {
  isValidMailContent,
};
