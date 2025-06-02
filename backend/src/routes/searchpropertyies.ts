
import express from 'express';
import Property from '../db/schema';
import redis from '../redisclient';

const router = express.Router();
router.use(express.json());

router.get('/property', async function (req: any, res: any) {
  try {
    const {
      title,
      city,
      state,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      amenities,
      furnished,
      isVerified,
      listedBy,
      tags,
      type,
      minArea,
      maxArea,
      colorTheme,
      minRating,
      listingType,
      availableFromStart,
      availableFromEnd,
    } = req.query;

    const filter: any = {};

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (city) filter.city = city;
    if (state) filter.state = state;
    if (furnished) filter.furnished = furnished;
    if (listedBy) filter.listedBy = listedBy;
    if (type) filter.type = type;
    if (listingType) filter.listingType = listingType;
    if (colorTheme) filter.colorTheme = colorTheme;
    if (bedrooms) filter.bedrooms = Number(bedrooms);
    if (bathrooms) filter.bathrooms = Number(bathrooms);

    if (isVerified !== undefined) {
      filter.isVerified = isVerified === 'true';
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minArea || maxArea) {
      filter.areaSqFt = {};
      if (minArea) filter.areaSqFt.$gte = Number(minArea);
      if (maxArea) filter.areaSqFt.$lte = Number(maxArea);
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    if (availableFromStart || availableFromEnd) {
      filter.availableFrom = {};
      if (availableFromStart) filter.availableFrom.$gte = new Date(availableFromStart);
      if (availableFromEnd) filter.availableFrom.$lte = new Date(availableFromEnd);
    }

    if (amenities) {
      const amenitiesArray = Array.isArray(amenities) ? amenities : amenities.split(',');
      filter.amenities = { $all: amenitiesArray };
    }

    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : tags.split(',');
      filter.tags = { $in: tagsArray };
    }

    // 🔁 Redis Caching Logic
    const redisKey = `properties:${JSON.stringify(req.query)}`;
    const cachedData = await redis.get(redisKey);

    if (cachedData) {
      return res.status(200).json({
        message: 'Query request successful (from cache)',
        properties: JSON.parse(cachedData),
      });
    }

    const properties = await Property.find(filter);

    if (properties.length === 0) {
      return res.status(404).json({
        message: 'No properties found matching your criteria',
        properties: [],
      });
    }

    // Save result to Redis with a TTL (e.g., 10 minutes)
    await redis.set(redisKey, JSON.stringify(properties), 'EX', 600);

    return res.status(200).json({
      message: 'Query request successful (from DB)',
      properties,
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Something went wrong during search' });
  }
});

export default router;
