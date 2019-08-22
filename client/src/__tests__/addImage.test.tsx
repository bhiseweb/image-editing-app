import * as types from '../action/actiontypes'
import * as actions from '../action/addImage'

describe('actions', () => {
  it('should create an action to add a image', () => {
    const payload = 'add image'
    const expectedAction = {
      type: types.ON_IMAGE_ADD_SUCCESS,
      payload
    }
    expect(actions.onImageAddSuccess(payload)).toEqual(expectedAction)
  });
});

