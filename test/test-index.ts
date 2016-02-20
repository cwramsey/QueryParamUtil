/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/assertion-error/assertion-error.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

'use strict';

const assert = require('chai').assert;
const qp = require('../index').QueryParamUtil;

describe('all', () => {
    it('should return null', () => {
        const res = qp.all('');
        assert.equal(res, null, `Actual value: ${res}`);
    });

    it('should return {name:chris}', () => {
        const res = qp.all('name=chris');
        assert.deepEqual(res, {name: 'chris'});
    });

    it('should return {name:chris, job:developer}', () => {
        const res = qp.all('name=chris&job=developer');
        assert.deepEqual(res, {name: 'chris', job: 'developer'});
    });

    it('should return {name:chris, job:developer, skills:[js,php,functional]}', () => {
        const res = qp.all('name=chris&job=developer&skills[]=js&skills[]=php&skills[]=functional');
        assert.deepEqual(res, {name: 'chris', job: 'developer', skills:['js','php','functional']});
    });
});

describe('set', () => {
    it('should return empty', () => {
        assert.equal(qp.set({}), '');
    });

    it('should return name=chris', () => {
        assert.equal(qp.set({name:'chris'}), 'name=chris');
    });

    it('should return name=chris&job=developer', () => {
        assert.equal(qp.set({name:'chris',job:'developer'}), 'name=chris&job=developer');
    });

    it('should return name=chris&job=developer&skills[]=js&skills[]=php&skills[]=functional', () => {
        assert.equal(qp.set({name:'chris',job:'developer'}), 'name=chris&job=developer');
    });
});