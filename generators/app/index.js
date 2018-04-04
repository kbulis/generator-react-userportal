'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`
        You are using the ${chalk.red(
          require('../../package.json').name + ' ' + require('../../package.json').version
        )} + ' generator...
      `)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your project description',
        default: 'Just another react express api using semantic-ui and docker project...'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author'
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Repository'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author,
        repository: this.props.repository
      }
    );

    this.fs.copyTpl(
      this.templatePath('_Dockerfile'),
      this.destinationPath('Dockerfile'),
      {
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore'),
      {
        name: this.props.name,
        description: this.props.description,
      }
    );

    this.fs.copyTpl(
      this.templatePath('_public'),
      this.destinationPath('public'),
      {
        name: this.props.name,
        description: this.props.description,
      }
    );

    this.fs.copyTpl(
      this.templatePath('_src/**'),
      this.destinationPath('src'),
      {
        name: this.props.name,
        description: this.props.description,
      }
    );
  }

  install() {
    this.yarnInstall();
  }
};
