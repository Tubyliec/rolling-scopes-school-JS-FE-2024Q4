type GenericObject<T> = {
  [key: number]: T;
};

export const animationState: GenericObject<{ id: number }> = {};
