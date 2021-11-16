import Router from '../app/libs/router'

Router.get('/', 'home@index', false)
Router.get('/provinces', 'province@all', false)
Router.get('/districts', 'district@all', false)
Router.get('/sub_districts', 'sub_district@all', false)
