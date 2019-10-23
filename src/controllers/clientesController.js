'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');
const ValidationContract = require('../validators/fluentValidators');
const repository = require('../repositories/clientesRepositories');