export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-class-pattern':
      '^(?:(?:o|is|has|u|t|s|c|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?$',
  },
};
