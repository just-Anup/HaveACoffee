import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;
    const CoffeeCard = ({
        id,
        index,
        type,
        roasted,
        imagelink_square,
        name,
        special_ingredient,
        average_rating,
        price,
        buttonPressHandler,
      }) => {
        return (
          <View
            style={styles.CardLinearGradientContainer}
         >
            <ImageBackground
              source={imagelink_square}
              style={styles.CardImageBG}
              resizeMode="contain">
              <View style={styles.CardRatingContainer}>
                <Icon
                  name={'star'}
                  color={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_16}
                />
                <Text style={styles.CardRatingText}>{average_rating}</Text>
              </View>
            </ImageBackground>
            <Text style={styles.CardTitle}>{name}</Text>
            <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
            <View style={styles.CardFooterRow}>
              <Text style={styles.CardPriceCurrency}>
                $ <Text style={styles.CardPrice}>{price.price}</Text>
              </Text>
              <TouchableOpacity
                onPress={() => {
                  buttonPressHandler({
                    id,
                    index,
                    type,
                    roasted,
                    imagelink_square,
                    name,
                    special_ingredient,
                    prices: [{...price, quantity: 1}],
                  });
                }}><TouchableOpacity  onPress={() => buttonPressHandler()}>
                <Icon
                  color={COLORS.primaryWhiteHex}
                  name={'add'}
                  style={styles.CardAddIcon}
                  size={FONTSIZE.size_24}
                />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            </View>
        );
  
}

export default CoffeeCard

const styles = StyleSheet.create({
    CardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
      },
      CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
      },
      CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,
      },
      CardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14,
      },
      CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
      },
      CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
      },
      CardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
      },
      CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
      },
      CardPrice: {
        color: COLORS.primaryWhiteHex,
      },
      CardAddIcon:{
        borderRadius: BORDERRADIUS.radius_8,
        backgroundColor: COLORS.primaryOrangeHex,
      }

})