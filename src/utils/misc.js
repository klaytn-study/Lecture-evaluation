// import Compressor from 'compressorjs'

const isArray = (obj) => obj instanceof Array

const renameKeys = (obj, newKeys) => Object
  .keys(obj)
  .reduce((acc, key) => ({
    ...acc,
    ...{ [newKeys[key] || key]: obj[key] },
  }), {})

export const last = (array) => {
  const length = array == null ? 0 : array.length
  return length ? array[length - 1] : undefined
}

export const courseParser = (course) => {
  const courseKeys = {
    0: 'id',
    1: 'campus',
    2: 'name',
    3: 'professor',
  }

  if (!isArray(course)) {
    return renameKeys(course, courseKeys)
  }

  const parsedCourse = course.map((course) => renameKeys(course, courseKeys))

  return parsedCourse
}

export const evaluationParser = (evaluation) => {
  const evaluationKeys = {
    0: 'title',
    1: 'score',
    2: 'content',
    3: 'timestamp',
  }

  if (!isArray(evaluation)) {
    return renameKeys(evaluation, evaluationKeys)
  }

  const parsedEvalutaion = evaluation.map((evaluation) => renameKeys(evaluation, evaluationKeys))

  return parsedEvalutaion
}
