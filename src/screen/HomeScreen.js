import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../Theme/theme';
import HeaderBar from '../component/HeaderBar';
import CustomIcon from '../component/CustomIcon';
import {FlatList} from 'react-native';
import CoffeeCard from '../component/CoffeeCard'
import {Dimensions} from 'react-native';

const getCategoriesFromData = (data) => {
  let temp = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category, data) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeelist = data.filter((item) => item.name == category);
    return coffeelist;
  }
};

const HomeScreen = ({navigation}) => {
  const CoffeeList = useStore((state) => state.CoffeeList);
  const BeanList = useStore((state) => state.BeansList);
  const addToCart = useStore((state) => state.addToCart);
  const calculateCartPrice = useStore((state) => state.calculateCartPrice);

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );
  const tabBarHeight = useBottomTabBarHeight();
  const CoffeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <View style={styles.ScreenContainer}>
    <StatusBar backgroundColor={COLORS.primaryBlackHex} />
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
      {/* App Header */}
      <HeaderBar />

      <Text style={styles.ScreenTitle}>
        Find the best{'\n'}coffee for you
      </Text>

      {/* Search Input */}

      <View style={styles.InputContainerComponent}>
        <TouchableOpacity>
          <CustomIcon
            style={styles.InputIcon}
            name="search"
            size={FONTSIZE.size_18}
            color={
              searchText.length > 0
                ? COLORS.primaryOrangeHex
                : COLORS.primaryLightGreyHex
            }
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Find Your Coffee..."
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
          }}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}
        />
        {searchText.length > 0 ? (
          <TouchableOpacity
           >
            <CustomIcon
              style={styles.InputIcon}
              name="close"
              size={FONTSIZE.size_16}
              color={COLORS.primaryLightGreyHex}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      {/* Category Scroller */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.CategoryScrollViewStyle}>
        {categories.map((data, index) => (
          <View
            key={index.toString()}
            style={styles.CategoryScrollViewContainer}>
            <TouchableOpacity
              style={styles.CategoryScrollViewItem}
              onPress={() => {
               
                setCategoryIndex({index: index, category: categories[index]});
                setSortedCoffee([
                  ...getCoffeeList(categories[index], CoffeeList),
                ]);
              }}>
              <Text
                style={[
                  styles.CategoryText,
                  categoryIndex.index == index
                    ? {color: COLORS.primaryOrangeHex}
                    : {},
                ]}>
                {data}
              </Text>
              {categoryIndex.index == index ? (
                <View style={styles.ActiveCategory} />
              ) : (
                <></>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Coffee Flatlist */}

      <FlatList
    
        horizontal
        ListEmptyComponent={
          <View style={styles.EmptyListContainer}>
            <Text style={styles.CategoryText}>No Coffee Available</Text>
          </View>
        }
        showsHorizontalScrollIndicator={false}
        data={sortedCoffee}
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push('DetailScreen', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                });
              }}>
              <CoffeeCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
        buttonPressHandler={() => addToCart(item)}
              />
            </TouchableOpacity>
          );
        }}
      />

      <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

      {/* Beans Flatlist */}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={BeanList}
        contentContainerStyle={[
          styles.FlatListContainer,
          {marginBottom: tabBarHeight},
        ]}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
            onPress={() => {
              // Handle item press without navigation
              console.log('Item pressed:', item); // or any other action you want to perform
            }}>
              <CoffeeCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={() => addToCart(item)}
              />
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  </View>
  )
}
 
const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default HomeScreen;
