'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM - DATA - STRUCTS - COMPOSITE
 ***********************************************************************************************************************************************
 * @description The composite struct is to manage working with Objects in a consistent way.
 *
 * @requirements
 *    1. The Composite API needs to consist of a minimum of 3 public methods:
 *      a. read
 *      b. write
 *      c. remove
 *    2. What the above methods do is up for intepretation but here are a few guidelines:
 *      1. When a new Composite instance is created, it should 'write' any data given to it at time of creation to the instance
 *      2. The instance data, should be private (hint, use function binding)
 *      3. Ideally, the mutabilty of the instance data should be configurable
 *        3.a Meaning that if I save data, it should be impossible to write to that exact same data again ()
 *        3.b Because Composites in javascript are 'pass-by-reference', when a Composite class' read is called,
 *          it should return a copy of the data (determined by mutability config)
 *      4. Make use of the member class for key decoration
 *    3. Write tests! (there's a composite test stub)
 *
 *  (you can model a few things after the collection struct)
 *
 */
