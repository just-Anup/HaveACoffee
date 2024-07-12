import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../Theme/theme';
import HeaderBar from '../component/HeaderBar';
import PaymentFooter from '../component/PaymentFooter';
import EmptyListAnimation from '../component/EmptyListAnimation';
import CartItem from '../component/CartItem';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const CartList = useStore((state) => state.CartList);
  const CartPrice = useStore((state) => state.CartPrice);

  
  const incrementCartItemQuantity = useStore(
    (state) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state) => state.decrementCartItemQuantity,
  );
  const calculateCartPrice = useStore((state) => state.calculateCartPrice);
  const tabBarHeight = useBottomTabBarHeight();

  const navigation = useNavigation();
  const buttonPressHandler = () => {
    console.log('Pay button pressed');
    navigation.navigate('Payment', {amount: CartPrice});
  };

  const incrementCartItemQuantityHandler = (id, size) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id, size) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" />

            {CartList.length == 0 ? (
              <EmptyListAnimation title={'Cart is Empty'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {CartList.map((data) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('DetailScreen', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {CartList.length != 0 ? (
            <PaymentFooter
              buttonPressHandler={buttonPressHandler}
              buttonTitle={'Pay'}
              price={{price: CartPrice, currency: '$'}}
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export default CartScreen;
