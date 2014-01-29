module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		meta: {
			source: {
				raiz: "source/",
				js: "<%= meta.source.raiz %>js/",
				css: "<%= meta.source.raiz %>css/",
				img: "<%= meta.source.raiz %>img/",
				examples: "<%= meta.source.raiz %>examples/"
			},
			tester: {
				raiz: "tester/",
				examples: "<%= meta.tester.raiz %>examples/",
				plugin: "<%= meta.tester.examples %>flextables/",
				js: "<%= meta.tester.plugin %>js/",
				css: "<%= meta.tester.plugin %>css/",
				img: "<%= meta.tester.plugin %>img/",
			},
			production: {
				raiz: "production/",
				js: "<%= meta.production.raiz %>js/",
				css: "<%= meta.production.raiz %>css/",
				img: "<%= meta.production.raiz %>img/"
			}
		},

		// Union project
		uglify: {
			options: {
				banner: '/**\n * <%= pkg.name %>\n * @version: <%= pkg.version %>\n * @author: <%= pkg.author %>\n * Date criation: <%= grunt.template.today("dd/mm/yyyy") %>\n */\n'
			},
			build: {
				files: {
					'<%= meta.production.raiz %><%= pkg.name %>.js': ['<%= meta.source.js %>*.js']
				}
			}
		},
		cssmin: {
			options: {
				banner: '/**\n * <%= pkg.name %>\n * @version: <%= pkg.version %>\n * @author: <%= pkg.author %>\n * Date criation: <%= grunt.template.today("dd/mm/yyyy") %>\n */\n'
			},
			build: {
				files: {
					'<%= meta.production.raiz %><%= pkg.name %>.css': ['<%= meta.source.css %>*.css']
				}
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			test: {
				src: ['<%= meta.source.js %>*.js'],
				dest: '<%= meta.tester.plugin %><%= pkg.name %>.js',
			},
		},
		copy: {
			test: {
				files: [{
					expand: true,
					cwd: '<%= meta.source.css %>',
					src: ['*.css'],
					dest: '<%= meta.tester.plugin %>'
				}, {
					expand: true,
					cwd: '<%= meta.source.js %>lang/',
					src: ['**'],
					dest: '<%= meta.tester.plugin %>lang/'
				}, {
					expand: true,
					cwd: '<%= meta.source.img %>',
					src: ['**'],
					dest: '<%= meta.tester.img %>'
				}, {
					expand: true,
					cwd: '<%= meta.source.examples %>',
					src: ['**'],
					dest: '<%= meta.tester.examples %>'
				}]
			},
			build: {
				files: [{
					expand: true,
					cwd: '<%= meta.source.js %>lang/',
					src: ['**'],
					dest: '<%= meta.production.raiz %>lang/'
				}, {
					expand: true,
					cwd: '<%= meta.source.img %>',
					src: ['**'],
					dest: '<%= meta.production.img %>'
				}]
			}
		},
		watch: {
			test: {
				files: ['<%= meta.source.js %>**/*.js', '<%= meta.source.css %>*.css', '<%= meta.source.examples %>**/**', '<%= meta.source.img %>**'],
				tasks: ["clean:test","concat:test", "copy:test"],
				options: {
					spawn: false,
				},
			},
		},
		clean: {
			build: ["<%= meta.production.raiz %>"],
			test: ["<%= meta.tester.raiz %>"]
		},
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	//Comandos
	grunt.registerTask('test', ["clean:test","concat:test", "copy:test", "watch:test"]);
	grunt.registerTask('build', ["clean:build","uglify:build", "cssmin:build", "copy:build"]);

};